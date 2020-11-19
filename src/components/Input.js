import { useContext } from "react"
import BoardContext from "../BoardContext"

function Input() {
	const {
		boardSize, setBoardSize,
		animationSpeed, setAnimationSpeed
	} = useContext(BoardContext)

	function createButtons(event) {
		if (event.target.value <= 26) {
			const n = Number(event.target.value)
			setBoardSize(n)
		}
	}

	function updateAnimationSpeed(event) {
		setAnimationSpeed(event.target.value)
	}

	return (
		<>
			<form style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-around",
			}}>
				<label htmlFor="num-cells" >
					<input
						autoFocus
						id="num-cells"
						min="5" // There are no solutions for n < 5
						max="26" // Sticking to the English alphabet
						name="num-cells"
						onChange={createButtons}
						style={{
							padding: "1rem",
							border: "1px solid black",
							marginTop: "1rem",
							display: "inline-block",
						}}
						type="number"
						value={boardSize}
					/>
					<p>Board size</p>
				</label>

				<label htmlFor="speed">
					<input
						type="range"
						name="animation-speed"
						onChange={updateAnimationSpeed}
						value={animationSpeed}
						min="0"
						max="500"
						step="5"
						style={{ width: "100%" }}
					/>
					<p>Interval: {animationSpeed} ms (total duration: {(animationSpeed * (boardSize ** 2) / 1000).toFixed(1)} s)</p>
				</label>
			</form>
		</>
	)
}

export default Input
import { useContext } from "react"
import BoardContext from "../BoardContext"

function Input() {
	const { boardSize, setBoardSize } = useContext(BoardContext)
	function createButtons(event) {
		const n = Number(event.target.value)
		setBoardSize(n)
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
				</label>

				<label htmlFor="speed">
					<input type="range" name="animation-speed" id="" />
				</label>
			</form>
		</>
	)
}

export default Input
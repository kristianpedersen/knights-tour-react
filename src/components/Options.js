import { useContext } from "react"
import { BoardContext } from "../BoardContext"

function Options() {
	const { boardSize, setBoardSize } = useContext(BoardContext)
	return (
		<>
			<form style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-around",
			}}>
				<label for="num-cells" >
					<input
						autoFocus
						id="num-cells"
						min="5" // There are no solutions for n < 5
						max="26" // Sticking to the English alphabet
						name="num-cells"
						onChange={e => setBoardSize(Number(e.target.value))}
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
				<button className="replay">Replay solution!</button>
			</form>
		</>
	)
}

export default Options
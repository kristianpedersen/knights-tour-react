import styled from "styled-components"
import { Calculate } from "../Calculate"

const SingleCell = styled.button`
		border: 1px solid;
		display: inline;
		transition: all .25s ease-out;
		border-color: #666;
		background-color: #333;
		color: #ddd;
		cursor: pointer;
		font-size: 1rem;
		
		&:hover {
			box-shadow: 0 0 10px white;
		}

		&.active:hover{
			box-shadow: 0 0 10px black;
		}
	`

function Cell({ name, x, y, setBoard, setHistory, boardSize }) {
	function disableAllButtonsAndCalculate() {
		document.querySelectorAll("button").forEach(btn => btn.removeAttribute("style"))
		const { history, playback } = Calculate(x, y, boardSize)
		setBoard(history)
		setHistory(playback)
	}

	return (
		<SingleCell
			className="board-button"
			onClick={disableAllButtonsAndCalculate}
		>
			{name}
		</SingleCell>
	)
}

export default Cell
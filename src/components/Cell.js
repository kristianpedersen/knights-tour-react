import styled from "styled-components"
import { Calculate } from "../Calculate"

const SingleCell = styled.button`
	border: 1px solid;
	display: inline;
	border-color: #666;
	background-color: #333;
	color: #ddd;
	cursor: pointer;
	font-size: 1rem;
	text-align: start;
	padding-left: 0.5rem;
	padding-right: -0.5rem;
	
	&:hover {
		box-shadow: 0 0 10px white;
	}

	&.active:hover{
		box-shadow: 0 0 10px black;
	}
`

function Cell({ name, x, y, setBoard, boardSize }) {
	function disableAllButtonsAndCalculate() {
		// setBoard([])
		document.querySelectorAll("svg").forEach(svg => svg.remove())
		document.querySelectorAll(".board-button")
			.forEach(btn => { btn.removeAttribute("style") })
		const { history } = Calculate(x, y, boardSize)
		setBoard(history)
		// setHistory(playback)
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
import { BoardContext } from "../BoardContext"
import { Calculate } from "../Calculate"
import { useContext } from "react"
import styled from "styled-components"

export default function Cell({ name, x, y }) {
	const {
		boardSize,
		setBoard,
	} = useContext(BoardContext)
	function disableAllButtonsAndCalculate() {
		document.querySelectorAll("svg").forEach(svg => svg.remove())
		document.querySelectorAll(".board-button")
			.forEach(btn => { btn.removeAttribute("style") })
		const { history } = Calculate(x, y, boardSize)
		setBoard(history)
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
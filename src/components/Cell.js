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
	background-color: #333;
	border: 1px solid #666;
	color: #ddd;
	cursor: pointer;
	display: inline;
	font-size: 1rem;
	padding-left: 0.5rem;
	padding-right: -0.5rem;
	text-align: start;
	transition: ease .1s all;
	
	&:hover {
		box-shadow: 0 0 10px white;
	}

	&.active:hover{
		box-shadow: 0 0 10px black;
	}
`
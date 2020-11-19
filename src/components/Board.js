import styled from "styled-components"
import Cell from "./Cell"
import { useContext } from "react"
import { BoardContext } from "../BoardContext"

function Board() {
	const emptyBoard = []
	const { boardSize } = useContext(BoardContext)
	document.querySelectorAll("svg").forEach(svg => svg.remove())

	const BoardContainer = styled.div`
		margin-top: 1rem;
		width: 100%;
		height: 100%;
		background: #333;
		color: #aaa;
		display: grid;
		grid-template-columns: repeat(${boardSize}, calc(${100 / boardSize}%));
		grid-template-rows: repeat(${boardSize}, calc(${100 / (boardSize)}%));
	`

	for (let y = 0; y < boardSize; y++) {
		const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[boardSize - 1 - y]
		for (let x = 0; x < boardSize; x++) {
			emptyBoard.push(
				<Cell
					name={`${letter}${x + 1}`}
					{...{ x, y }}
				/>
			)
		}
	}

	return (
		<BoardContainer className="board">
			{ emptyBoard.map(element => element)}
		</BoardContainer>
	)
}

export default Board
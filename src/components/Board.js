import styled from "styled-components"
import Cell from "./Cell"
import { useContext } from "react"
import { BoardContext } from "../BoardContext"

function Board() {
	const { boardSize } = useContext(BoardContext)
	const emptyBoard = []

	for (let y = 0; y < boardSize; y++) {
		const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[boardSize - 1 - y]
		for (let x = 0; x < boardSize; x++) {
			emptyBoard.push(
				<Cell
					name={`${letter}${x + 1}`}
					percent={0}
					{...{ x, y }}
				/>
			)
		}
	}

	console.table(emptyBoard)

	const BoardContainer = styled.div`
		margin-top: 1rem;
		width: 100%;
		height: 100%;
		background: beige;
		display: grid;
		grid-template-columns: repeat(${boardSize}, calc(${100 / boardSize}%));
		grid-template-rows: repeat(${boardSize}, calc(${100 / (boardSize)}%));
	`
	return (
		<BoardContainer>
			{ emptyBoard.map(element => element)}
		</BoardContainer>
	)
}


export default Board
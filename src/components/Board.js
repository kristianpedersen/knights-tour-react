import styled from "styled-components"
import Cell from "./Cell"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from 'uuid'

const BoardContainer = styled(motion.div).attrs(({ variants }) => ({
	initial: variants.out,
	animate: variants.in,
	exit: variants.out,
}))`
	margin-top: 1rem;
	width: 100%;
	height: 100%;
	display: flex;
	background: #333;
	color: #aaa;		

	hr {
		visibility: hidden;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		width: 100vw;
	}

	button {
		display: inline-block;
		height: 100%;
	}
`
function Board({ boardRef, boardSize, setBoard, setHistory, variants }) {
	useEffect(() => {
		document.querySelectorAll("svg")
			.forEach(svg => svg.remove())
		document.querySelectorAll("button")
			.forEach(btn => btn.removeAttribute("style"))
	}, [boardSize])

	const board = []
	for (let y = 0; y < boardSize; y++) {
		const row = []
		for (let x = 0; x < boardSize; x++) {
			const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[boardSize - x - 1]
			row.push(
				<Cell
					name={`${letter}${y + 1}`}
					x={y}
					y={x}
					{...{
						boardSize,
						setBoard,
						setHistory,
					}}
					key={uuidv4()}
				/>
			)
		}
		board.push(row)
	}

	return (
		<BoardContainer className="board" ref={boardRef} {...{ boardSize, variants }}>
			{board.map(row => {
				return (
					<div className="row">
						{row.map(cell => cell)}
					</div>
				)
			})}
		</BoardContainer>
	)
}

export { Board }
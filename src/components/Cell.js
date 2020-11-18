import styled from "styled-components"
import { BoardContext } from "../BoardContext"
import { useContext } from "react"
import Calculate from "../Calculate"

function Cell({ name, x, y }) {
	const { boardSize, setIsCalculating } = useContext(BoardContext)

	const {
		active,
		isCalculating,
		percent,
	} = useContext(BoardContext)


	function Calculate(x, y) {
		setIsCalculating(true)
		console.clear()
		const numberOfCells = boardSize ** 2
		const startX = 1
		const startY = 2
		const board = [...Array(boardSize)].map((_, x) => [...Array(boardSize)].map((_, y) => Cell(x, y)))
		const history = []
		const playback = []
		const optimizedAlgorithm = true
		let n = 0

		board[startX][startY].validMoves = board[startX][startY].getValidMoves()
		console.table(history)

		if (history.length === boardSize ** 2) {
			console.log(`Jippi! Greide det på ${n.toLocaleString("NO")} trekk!`)
			setIsCalculating(false)
		} else {
			console.log("Enten rewind eller ingen løsning")
		}

		function Cell(cellX, cellY) {
			let validMoves = []
			const rowName = "ABCDEFGHIJK"[boardSize - 1 - cellY]
			const colName = cellX + 1
			const name = `${rowName}${colName}`

			function getValidMoves(getValidMovesLength = true, rewind = false) {
				n++
				if (getValidMovesLength) {
					if (history.length > 0) {
						playback.push({ ...history[history.length - 1], colorize: true })
						playback.push(...validMoves)
					}
					history.push(board[cellX][cellY])
					history[history.length - 1].visited = true
					board[cellX][cellY].visited = true
				}

				if (rewind) {
					validMoves.push(validMoves.shift())
				} else {
					validMoves = board.flat().filter(otherCell => {
						const valid1 = (Math.abs(otherCell.x - cellX) === 2) && (Math.abs(otherCell.y - cellY) === 1)
						const valid2 = (Math.abs(otherCell.x - cellX) === 1) && (Math.abs(otherCell.y - cellY) === 2)
						return (valid1 || valid2) && !otherCell.visited
					})
				}

				if (getValidMovesLength && validMoves.length > 0) {
					for (const move of validMoves) {
						move.validMoves = move.getValidMoves(getValidMovesLength = false)
					}

					if (optimizedAlgorithm) {
						validMoves.sort((a, b) => a.validMoves.length - b.validMoves.length)
					} else {
						validMoves.sort((a, b) => b.validMoves.length - a.validMoves.length)
					}

					const next = validMoves[0]
					board[next.x][next.y].getValidMoves()
				} else if (getValidMovesLength && validMoves.length === 0 && history.length < numberOfCells) {
					goBackInHistory()
				}

				return validMoves
			}

			function goBackInHistory() {
				for (let i = history.length - 1; i >= 0; i--) {
					if (history[i].validMoves.length >= 2) {
						const { x, y } = history[i]
						board[x][y].getValidMoves(true, true)
						break
					} else {
						history.pop()
					}
				}
			}

			return {
				name,
				x: cellX,
				y: cellY,
				getValidMoves,
			}
		}
	}


	const CellButton = styled.button`
		${active && `background-color: hsl(${Math.floor(percent)}, 50%, 80%)`}
	`

	return (
		<CellButton
			disabled={isCalculating}
			onClick={() => Calculate(x, y)}
		>
			{name}
		</CellButton>
	)
}

export default Cell
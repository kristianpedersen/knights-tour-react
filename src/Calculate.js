/**
 Prototyped it in Node.js. Haven't adapted it properly to React yet.
 For the time being, it simply returns an array.
 It could surely be made to affect state, but would the number of state updates be too taxing?
 The unimplemented "playback" array includes a cell's valid moves. This would also be cool to visualize.
 */

export function Calculate(startX, startY, boardSize) {
	const numberOfCells = boardSize ** 2
	const board = [...Array(boardSize)].map((_, x) => [...Array(boardSize)].map((_, y) => Cell(x, y)))
	const history = []
	const playback = []

	board[startX][startY].validMoves = board[startX][startY].getValidMoves()
	if (history.length === numberOfCells) {
		return { history, playback }
	}

	function Cell(cellX, cellY) {
		let validMoves = []
		const rowName = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ"[boardSize - cellY - 1]
		const colName = cellX + 1
		const name = `${rowName}${colName}`

		function getValidMoves(getValidMovesLength = true, rewind = false) {
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
				validMoves = getValidCellsFromBoard()
			}

			if (getValidMovesLength && validMoves.length > 0) {
				for (const move of validMoves) {
					move.validMoves = move.getValidMoves(getValidMovesLength = false)
				}
				validMoves.sort((a, b) => a.validMoves.length - b.validMoves.length)
				const next = validMoves[0]
				board[next.x][next.y].getValidMoves()
			} else if (getValidMovesLength && validMoves.length === 0 && history.length < numberOfCells) {
				goBackInHistory()
			}

			return validMoves
		}

		function getValidCellsFromBoard() {
			return board.flat().filter(otherCell => {
				const xDistance = Math.abs(otherCell.x - cellX) * -1
				const yDistance = Math.abs(otherCell.y - cellY) * -1
				const moveIsValid =
					(xDistance === -2 && yDistance === -1)
					|| (xDistance === -1 && yDistance === -2)
				return moveIsValid && !otherCell.visited
			})
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
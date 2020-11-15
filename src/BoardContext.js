import { createContext, useState, useEffect } from "react"

export const BoardContext = createContext()
export function BoardProvider({ children }) {
	const [board, setBoard] = useState([])
	const [boardSize, setBoardSize] = useState(5)
	const [isCalculating, setIsCalculating] = useState(false)

	useEffect(() => {
		setBoard([{ lol: true }])
	}, [])

	return (
		<BoardContext.Provider
			value={{
				board, setBoard,
				boardSize, setBoardSize,
				isCalculating, setIsCalculating
			}}>
			{children}
		</BoardContext.Provider>
	)
}
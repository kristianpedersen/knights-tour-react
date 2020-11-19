import { createContext, useState } from "react"

export const BoardContext = createContext()

export function BoardProvider({ children }) {
	const [animationSpeed, setAnimationSpeed] = useState(50)
	const [board, setBoard] = useState([])
	const [boardSize, setBoardSize] = useState(8)
	const [history, setHistory] = useState([])
	const [playback, setPlayback] = useState([])
	const [showLines, setShowLines] = useState(true)

	return (
		<BoardContext.Provider value={{
			animationSpeed, setAnimationSpeed,
			board, setBoard,
			boardSize, setBoardSize,
			history, setHistory,
			playback, setPlayback,
			showLines, setShowLines,
		}}>
			{children}
		</BoardContext.Provider>
	)
}
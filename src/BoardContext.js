import { createContext, useRef, useState } from "react"
export const BoardContext = createContext()

export const BoardProvider = props => {
	const [board, setBoard] = useState([])
	const [boardSize, setBoardSize] = useState(8)
	const [history, setHistory] = useState([])

	const animationSpeed = useRef(250)
	const boardRef = useRef()
	const sliderRef = useRef()

	const variants = {
		in: { opacity: 1 },
		out: { opacity: 0 },
	}

	return (
		<BoardContext.Provider value={{
			board, setBoard,
			boardSize, setBoardSize,
			history, setHistory,
			animationSpeed,
			boardRef,
			sliderRef,
			variants,
		}}>
			{props.children}
		</BoardContext.Provider>
	)
}
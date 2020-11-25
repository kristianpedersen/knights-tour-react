import { createContext, useRef, useState } from "react"
export const BoardContext = createContext()

export const BoardProvider = props => {
	const [board, setBoard] = useState([])
	const [boardSize, setBoardSize] = useState(8)
	const [history, setHistory] = useState([])
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const animationSpeed = useRef(50)
	const boardRef = useRef()
	const sliderRef = useRef()
	const variants = {
		in: { opacity: 1 },
		out: { opacity: 0 },
	}

	return (
		<BoardContext.Provider value={{
			animationSpeed,
			board, setBoard,
			boardRef,
			boardSize, setBoardSize,
			history, setHistory,
			modalIsOpen, setModalIsOpen,
			sliderRef,
			variants,
		}}>
			{props.children}
		</BoardContext.Provider>
	)
}
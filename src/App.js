import About from "./components/About"
import Animation from "./components/Animation"
import { Board } from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"

import { useState, useRef } from "react"
import { Switch, Route } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import "./App.css"

function App() {
	const animationSpeed = useRef(50)
	const [animate, setAnimate] = useState(true)
	const [board, setBoard] = useState([])
	const [boardSize, setBoardSize] = useState(8)
	const [cancelAnimation, setCancelAnimation] = useState(false)
	const [history, setHistory] = useState([])
	const [resetButton, setResetButton] = useState(false)

	const boardRef = useRef()
	const cellRef = useRef([])

	const variants = {
		in: { opacity: 1 },
		out: { opacity: 0 },
	}

	const animationProps = {
		animate,
		animationSpeed,
		board, boardRef,
		cancelAnimation, setCancelAnimation,
		resetButton,
	}
	const inputProps = {
		animate, setAnimate,
		animationSpeed,
		board, setBoard,
		boardSize, setBoardSize,
		resetButton, setResetButton,
	}
	const boardProps = {
		boardRef,
		boardSize,
		history, setHistory,
		setBoard,
		setCancelAnimation,
		variants
	}
	return (
		<div className="App">
			<Menu {...{ setBoard }} />
			<AnimatePresence exitBeforeEnter>
				<Switch>
					<Route exact path="/knights-tour-react">
						<Animation {...animationProps} />
						<Input {...inputProps} />
						<Board {...boardProps} />
					</Route>
					<Route exact path="/knights-tour-react/about">
						<About {...{ setCancelAnimation, variants }} />
					</Route>
				</Switch>
			</AnimatePresence>
		</div>
	)
}

export default App

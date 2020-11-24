import About from "./components/About"
import Animation from "./components/Animation"
import { Board } from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"

import { useState, useRef } from "react"
import { Switch, Route } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import "./App.css"

function App() {
	const animationSpeed = useRef(50)
	const [board, setBoard] = useState([])
	const [boardSize, setBoardSize] = useState(8)
	const [animate, setAnimate] = useState(true)
	const [history, setHistory] = useState([])
	const [resetButton, setResetButton] = useState(false)

	const variants = {
		in: { opacity: 1 },
		out: { opacity: 0 },
	}

	const animationProps = {
		animate,
		animationSpeed,
		board,
		resetButton
	}
	const inputProps = {
		animate, setAnimate,
		animationSpeed,
		board, setBoard,
		boardSize, setBoardSize,
		resetButton, setResetButton,
	}
	const boardProps = {
		boardSize,
		history, setHistory,
		setBoard,
		variants
	}
	return (
		<div className="App">
			<Menu />
			<AnimatePresence exitBeforeEnter>
				<Switch>
					<Route exact path="/knights-tour-react">
						<>
							<Animation {...animationProps} />
							<Input {...inputProps} />
							<Board {...boardProps} />
						</>
					</Route>
					<Route exact path="/knights-tour-react/about">
						<About {...{ variants }} />
					</Route>
				</Switch>
			</AnimatePresence>
		</div>
	)
}

export default App

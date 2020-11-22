import About from "./components/About"
import Animation from "./components/Animation"
import { Board, MemoizedBoard } from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"

import { useState, useRef } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"

function App() {
	const [animationSpeed, setAnimationSpeed] = useState(50)
	const [board, setBoard] = useState([])
	const [boardSize, setBoardSize] = useState(8)
	const [history, setHistory] = useState([])
	const [resetButton, setResetButton] = useState(false)
	const animationSpeedRef = useRef(50)
	return (
		<div className="App">
			<Router>
				<Menu />
				<Animation {...{ animationSpeed, animationSpeedRef, board, resetButton }} />
				<Input {...{
					animationSpeed, setAnimationSpeed,
					animationSpeedRef,
					boardSize, setBoardSize,
					resetButton, setResetButton,
					setBoard,
				}} />
				<Board {...{ boardSize, setBoard, history, setHistory }} />
			</Router>
		</div>
	)
}

export default App

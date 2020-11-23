import About from "./components/About"
import Animation from "./components/Animation"
import { Board } from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"

import { useState, useRef } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"

function App() {
	const animationSpeed = useRef(50)
	const [board, setBoard] = useState([])
	const [boardSize, setBoardSize] = useState(8)
	const [history, setHistory] = useState([])
	const [resetButton, setResetButton] = useState(false)

	return (
		<div className="App">
			<Router>
				<Menu />
				<Animation {...{
					animationSpeed,
					board,
					resetButton
				}} />
				<Input {...{
					animationSpeed,
					boardSize, setBoardSize,
					resetButton, setResetButton,
					setBoard,
				}} />
				<Board {...{
					boardSize, setBoard,
					history, setHistory
				}} />
			</Router>
		</div>
	)
}

export default App

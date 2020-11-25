import "./App.css"
import { BoardProvider } from "./BoardContext"
import About from "./components/About"
import Animation from "./components/Animation"
import Board from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"

import { AnimatePresence } from "framer-motion"
import { Switch, Route } from "react-router-dom"
import Modal from "react-modal"

Modal.setAppElement("#root")

function App() {
	return (
		<BoardProvider>
			<div className="App">
				<Menu />
				<AnimatePresence exitBeforeEnter>
					<Switch>
						<Route exact path="/knights-tour-react">
							<Animation />
							<Input />
							<Board />
						</Route>
						<Route exact path="/knights-tour-react/about">
							<About />
						</Route>
					</Switch>
				</AnimatePresence>
			</div>
		</BoardProvider>
	)
}

export default App

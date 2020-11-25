import "./App.css"
import { BoardContext } from "./BoardContext"
import { BoardProvider } from "./BoardContext"
import About from "./components/About"
import Animation from "./components/Animation"
import Board from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"

import { AnimatePresence } from "framer-motion"
import { Route, Switch } from "react-router-dom"
import { useContext } from "react"


function App() {
	return (
		<BoardProvider>
			<div className="App">
				<Menu />
				{/* <Switch> */}
				{/* <Route exact path="/knights-tour-react"> */}
				<Animation />
				<Input />
				<Board />
				{/* </Route> */}
				{/* <Route exact path="/knights-tour-react/about"> */}
				<About />
				{/* </Route> */}
				{/* </Switch> */}
			</div>
		</BoardProvider>
	)
}

export default App

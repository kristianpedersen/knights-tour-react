import About from "./components/About"
import Animation from "./components/Animation"
import Board from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"

import { BoardProvider } from "./BoardContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"

function App() {
	return (
		<BoardProvider>
			<div className="App">
				<Router>
					<Menu title="Knight's Tour" />

					<Switch>
						<Route exact path="/">
							<Animation />
							<Input />
							<Board />
						</Route>
						<Route path="/about">
							<About />
						</Route>
					</Switch>

				</Router>
			</div>
		</BoardProvider>
	)
}

export default App

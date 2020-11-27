import "./App.css"
import { BoardProvider } from "./BoardContext"
import AboutModal from "./components/About"
import Animation from "./components/Animation"
import Board from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"

function App() {
	return (
		<BoardProvider>
			<div className="App">
				{/* <Menu /> */}
				<Input />
				<Board />
				<Animation />
				<AboutModal />
			</div>
		</BoardProvider>
	)
}

export default App

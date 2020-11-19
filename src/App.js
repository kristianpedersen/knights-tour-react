import Animation from "./components/Animation"
import Board from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"
import { BoardProvider } from "./BoardContext"
import "./App.css"

function App() {
  return (
    <BoardProvider>
      <div className="App">
        <Animation />
        <Menu title="Knight's Tour" />
        <Input />
        <Board />
      </div>
    </BoardProvider>
  )
}

export default App

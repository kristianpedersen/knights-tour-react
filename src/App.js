import Board from "./components/Board"
import Options from "./components/Options"
import Menu from "./components/Menu"
import { BoardProvider } from "./BoardContext"
import "./App.css"

function App() {


  return (
    <BoardProvider>
      <div className="App">
        <Menu title="Knight's Tour" />
        <Options />
        <Board />
      </div>
    </BoardProvider>

  )
}

export default App

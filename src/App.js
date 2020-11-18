import Board from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"
import { useState, useEffect } from "react"
import BoardContext from "./BoardContext"
import "./App.css"

function App() {

  const [board, setBoard] = useState([])
  const [boardSize, setBoardSize] = useState(8)
  const [history, setHistory] = useState([])
  const [playback, setPlayback] = useState([])

  useEffect(function animationOnBoardUpdate() {
    const buttons = [...document.querySelectorAll(".board-button")]
    buttons.forEach(button => button.classList.remove("active"))

    board.forEach((move, index) => {
      setTimeout(() => {
        const button = buttons.find(b => b.innerHTML === move.name)
        if (button !== undefined) {
          button.innerHTML += ` (${index + 1})`
          button.classList.add("active")
          button.style.backgroundColor = `hsl(${Math.floor(index * (720 / board.length))}, 50%, 80%)`
          button.style.color = "black"
        }
      }, index * 20)
    })

  }, [board])

  return (
    <BoardContext.Provider value={{
      board, setBoard,
      boardSize, setBoardSize,
      history, setHistory,
      playback, setPlayback
    }}>
      <div className="App">
        <Menu title="Knight's Tour" />
        <Input />
        <Board />
      </div>
    </BoardContext.Provider>
  )
}

export default App

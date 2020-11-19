import Board from "./components/Board"
import Input from "./components/Input"
import Menu from "./components/Nav"
import { useState, useEffect } from "react"
import BoardContext from "./BoardContext"
import "./App.css"

function App() {
  const [animationSpeed, setAnimationSpeed] = useState(50)
  const [board, setBoard] = useState([])
  const [boardSize, setBoardSize] = useState(8)
  const [history, setHistory] = useState([])
  const [playback, setPlayback] = useState([])

  useEffect(function animationOnBoardUpdate() {
    const buttons = [...document.querySelectorAll(".board-button")]
    buttons.forEach(button => button.classList.remove("active"))

    board.forEach((move, index, array) => {
      setTimeout(() => {
        const button = buttons.find(b => b.innerHTML === move.name)
        const hue = Math.floor(index * (270 / board.length))

        // Draw SVG line from this button to next
        const { left, width, top, height } = button.getBoundingClientRect()
        const x = left + width / 2
        const y = top + height / 2

        if (index < board.length - 1) {
          const nextButton = buttons.find(b => b.innerHTML === board[index + 1].name)
          const nextClientRect = nextButton.getBoundingClientRect()
          const next = {
            left: nextClientRect.left,
            width: nextClientRect.width,
            top: nextClientRect.top,
            height: nextClientRect.height,
          }
          console.log(next.left, next.width, next.top, next.height)
          const nextX = next.left + next.width / 2
          const nextY = next.top + next.height / 2
          const pathString = `M ${x} ${y} L ${nextX} ${nextY}`
          let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
          svg.setAttributeNS(null, 'width', '100%')
          svg.setAttributeNS(null, 'height', '100%')
          let line = document.createElementNS("http://www.w3.org/2000/svg", "path")
          line.setAttributeNS(null, "d", pathString);
          line.setAttributeNS(null, 'fill', `hsl(${hue}, 100%, 50%)`)
          line.setAttributeNS(null, 'stroke', "black")
          line.setAttributeNS(null, 'stroke-width', "5")
          svg.appendChild(line)
          svg.style.position = "absolute"
          svg.style.left = 0
          svg.style.bottom = 0
          document.body.appendChild(svg)
        }



        if (button !== undefined) {
          button.innerHTML += ` (${index + 1})`
          button.classList.add("active")
          button.style.backgroundColor = `hsl(${hue}, 50%, 80%)`
          button.style.color = "black"
        }
      }, index * animationSpeed)
    })

  }, [board])

  return (
    <BoardContext.Provider value={{
      animationSpeed, setAnimationSpeed,
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

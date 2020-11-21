import { useEffect } from "react"

function pause(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function Animation({ animationSpeedRef, board, history }) {
	useEffect(function animateBoardOnStateChange() {
		const buttons = [...document.querySelectorAll(".board-button")]

		function generateLines() {

		}

		async function colorizeButtons() {
			for (const [index, move] of board.entries()) {
				const button = buttons.find(function getCurrentButton(b) {
					return b.innerHTML === move.name
				})
				const hue = Math.floor(index * (270 / board.length))

				if (button !== undefined) {
					// button.innerHTML += ` (${index + 1})`
					button.classList.add("active")
					if (index === 0) {
						button.style.borderColor = "white"
					}
					button.style.backgroundColor = `hsl(${hue}, 50%, 80%)`
					button.style.color = "black"
				}
				await pause(animationSpeedRef.current)
			}
		}
		colorizeButtons()
	}, [board])
	return null
}

export default Animation
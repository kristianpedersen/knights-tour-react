import { useEffect } from "react"

function pause(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function Animation({ animationSpeed, animationSpeedRef, board }) {
	useEffect(function animateBoardOnStateChange() {
		const buttons = [...document.querySelectorAll(".board-button")]
		document.querySelectorAll("svg").forEach(svg => svg.remove())

		async function colorizeButtons() {
			for (const [index, move] of board.entries()) {
				// Initialize svg
				const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
				svg.style.position = "absolute"
				svg.style.left = 0
				svg.style.top = 0
				svg.setAttribute("viewBox", "0 0 400 800")
				let pathString = ""
				svg.setAttributeNS(null, 'width', '100vw')
				svg.setAttributeNS(null, 'height', '100%')
				const blackLine = document.createElementNS("http://www.w3.org/2000/svg", "path")
				const coloredLine = document.createElementNS("http://www.w3.org/2000/svg", "path")

				const button = buttons.find(function getCurrentButton(b) {
					return b.innerHTML === move.name
				})
				const hue = Math.floor(index * (270 / board.length))

				if (index > 0) { // ... we draw a line from previous move to current move
					const { left, width, top, height } = button.getBoundingClientRect()
					const x = left + width / 2
					const y = top + height / 2
					const previousButton = buttons.find(b => b.innerHTML === board[index - 1].name)
					const previousClientRect = previousButton.getBoundingClientRect()
					const previous = {
						left: previousClientRect.left,
						width: previousClientRect.width,
						top: previousClientRect.top,
						height: previousClientRect.height,
					}
					const previousX = previous.left + previous.width / 2
					const previousY = previous.top + previous.height / 2

					pathString += `M ${x} ${y} L ${previousX} ${previousY}`

					blackLine.setAttributeNS(null, "d", pathString);
					blackLine.setAttributeNS(null, 'stroke', "black")
					blackLine.setAttributeNS(null, 'stroke-width', "4")
					blackLine.setAttributeNS(null, 'stroke-opacity', 0.5)

					coloredLine.setAttributeNS(null, "d", pathString);
					coloredLine.setAttributeNS(null, 'stroke', `hsl(${hue}, 100%, 50%)`)
					coloredLine.setAttributeNS(null, 'stroke-width', "2")
					// coloredLine.setAttributeNS(null, 'stroke-opacity', 0.5)

					svg.appendChild(blackLine)
					svg.appendChild(coloredLine)

					svg.style.position = "absolute"
					svg.style.left = 0
					svg.style.bottom = 0
					document.body.appendChild(svg)
				}

				if (button !== undefined) {
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
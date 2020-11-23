import { useEffect, useRef } from "react"

function pause(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

function Animation({ animationSpeedRef, board }) {
	const initialRender = useRef(true)

	useEffect(function resizeSVGOnWindowResize() {
		if (initialRender.current) {
			initialRender.current = false
			console.log("Setting up event listener")
			window.addEventListener("resize", function handleResize() {
				const newBoardHeight = document.querySelector(".board").getBoundingClientRect().height
				document.querySelectorAll("svg").forEach(svg => svg.setAttribute("height", newBoardHeight))
			})
		}
	})

	useEffect(function animateBoardOnStateChange() {
		const boardDimensions = document.querySelector(".board").getBoundingClientRect()
		const boardWidth = boardDimensions.width
		const boardHeight = boardDimensions.height

		if (board.length >= 25) {
			const buttons = [...document.querySelectorAll(".board-button")]
			document.querySelectorAll("svg").forEach(svg => svg.remove())
			async function colorizeButtons() {
				for (const [index, move] of board.entries()) {
					// Initialize svg
					const ns = "http://www.w3.org/2000/svg"
					const svg = document.createElementNS(ns, 'svg')
					svg.setAttribute("preserveAspectRatio", "none")
					svg.setAttribute("viewBox", `0 0 ${boardWidth} ${boardHeight}`)

					const button = buttons.find(function getCurrentButton(b) {
						return b.innerHTML === move.name
					})
					let pathString = ""
					svg.setAttributeNS(null, 'width', '100vw')
					svg.setAttributeNS(null, 'height', document.querySelector(".board").getBoundingClientRect().height)
					const blackLine = document.createElementNS(ns, "path")
					const coloredLine = document.createElementNS(ns, "path")

					const hue = Math.floor(index * (270 / board.length))
					if (button === undefined) {
						return
					}
					const { left, width, top, height } = button.getBoundingClientRect()

					if (index > 0 && button !== undefined) {
						const x = left + width / 2
						const y = Math.abs(top - document.querySelector(".board").getBoundingClientRect().top + height / 2)
						const previousButton = buttons.find(b => b.innerHTML === board[index - 1].name)
						previousButton.innerHTML = index

						const previousClientRect = previousButton.getBoundingClientRect()
						const previous = {
							left: previousClientRect.left,
							width: previousClientRect.width,
							top: previousClientRect.top,
							height: previousClientRect.height,
						}
						const previousX = previous.left + width / 2
						const previousY = Math.abs(previous.top - document.querySelector(".board").getBoundingClientRect().top + height / 2)

						pathString += `M ${x} ${y} L ${previousX} ${previousY}`

						blackLine.setAttributeNS(null, "d", pathString);
						blackLine.setAttributeNS(null, 'stroke', "black")
						blackLine.setAttributeNS(null, 'stroke-width', "4")
						blackLine.setAttributeNS(null, 'stroke-opacity', 0.1)

						coloredLine.setAttributeNS(null, "d", pathString);
						coloredLine.setAttributeNS(null, 'stroke', `hsl(${hue}, 100%, 50%)`)
						coloredLine.setAttributeNS(null, 'stroke-width', "2")

						svg.appendChild(blackLine)
						svg.appendChild(coloredLine)

						svg.style.position = "absolute"
						svg.style.left = 0
						svg.style.bottom = 0
						document.querySelector(".board").appendChild(svg)
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
		}
	}, [board])
	return null
}

export default Animation
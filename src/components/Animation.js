import { BoardContext } from "../BoardContext"
import { useContext, useEffect, useRef } from "react"

function pause(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export default function Animation() {
	const { animationSpeed, board } = useContext(BoardContext)
	const initialRender = useRef(true)

	useEffect(function resizeSVGOnWindowResize() {
		if (initialRender.current) {
			initialRender.current = false
			console.log("Setting up event listener")
			window.addEventListener("resize", function handleResize() {
				if (document.querySelector(".board") !== null) {
					const newBoardHeight = document.querySelector(".board").getBoundingClientRect().height
					document.querySelectorAll("svg").forEach(svg => svg.setAttribute("height", newBoardHeight))
				}
			})
		}
	})

	useEffect(function animateSolution() {
		const boardDimensions = document.querySelector(".board").getBoundingClientRect()
		const boardWidth = boardDimensions.width
		const boardHeight = boardDimensions.height

		if (board.length >= 25) {
			const buttons = [...document.querySelectorAll("button")]
			document.querySelectorAll("svg").forEach(svg => svg.remove())

			async function colorizeButtons() {
				for (const [index, move] of board.entries()) {
					const button = buttons.find(function getCurrentButton(b) {
						return b.innerHTML === move.name
					})

					if (button === undefined) {
						return
					}

					// Initialize svg
					const ns = "http://www.w3.org/2000/svg"
					const svg = document.createElementNS(ns, 'svg')
					svg.setAttribute("preserveAspectRatio", "none")
					svg.setAttribute("viewBox", `0 0 ${boardWidth} ${boardHeight}`)

					let pathString = ""
					const boardClientRect = document.querySelector(".board").getBoundingClientRect()
					svg.setAttributeNS(null, 'width', '100vw')
					svg.setAttributeNS(null, 'height', boardClientRect.height || 0)
					const blackLine = document.createElementNS(ns, "path")
					const coloredLine = document.createElementNS(ns, "path")

					const hue = Math.floor(index * (270 / board.length))
					const { left, width, top, height } = button.getBoundingClientRect()

					if (index > 0) { // Draw SVG line from previous position to current position
						const x = left + width / 2
						const y = Math.abs(top - document.querySelector(".board").getBoundingClientRect().top + height / 2)
						const previousButton = buttons.find(b => b.innerHTML === board[index - 1].name)
						if (previousButton === undefined) {
							return
						}
						previousButton.innerHTML = index
						if (index === board.length - 1) {
							button.innerHTML = index + 1
						}

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

						blackLine.setAttributeNS(null, 'stroke', "black")
						coloredLine.setAttributeNS(null, 'stroke', `hsl(${hue}, 100%, 70%)`)
						blackLine.setAttributeNS(null, 'stroke-width', 6)
						coloredLine.setAttributeNS(null, 'stroke-width', 3)

						for (const bothLines of [blackLine, coloredLine]) {
							bothLines.setAttributeNS(null, "d", pathString);
							bothLines.setAttributeNS(null, "stroke-linecap", "round")
							svg.appendChild(bothLines)
						}

						// Start and end positions are black, with a red or green circle inside
						if (index === 1 || index === board.length - 1) {
							const successfulMove = new Set(board.map(move => move.name)).size === board.length
							const indicator = document.createElementNS(ns, "circle")
							indicator.setAttributeNS(null, "cx", index === 1 ? previousX : x)
							indicator.setAttributeNS(null, "cy", index === 1 ? previousY : y)
							indicator.setAttributeNS(null, "r", Math.min(width, height) / Math.PI)
							indicator.setAttributeNS(null, "stroke-width", 1)
							indicator.setAttributeNS(null, "fill", successfulMove ? "lime" : "red")
							indicator.setAttributeNS(null, "stroke", "black")

							svg.appendChild(indicator)
						}

						svg.style.position = "absolute"
						svg.style.left = 0
						svg.style.bottom = 0
						document.querySelector(".board").appendChild(svg)
					}

					button.classList.add("active")
					if (index > 0 && index < board.length - 1) {
						button.style.backgroundColor = `hsl(${hue}, 50%, 80%)`
						button.style.color = "black"
					} else {
						button.style.backgroundColor = "#333"
						button.style.color = "white"
					}
					await pause(animationSpeed.current)
				}
			}
			colorizeButtons()
		}
	}, [board, animationSpeed])
	return null
}
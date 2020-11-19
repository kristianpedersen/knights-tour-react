import { useContext, useEffect } from "react"
import { BoardContext } from "../BoardContext"

function Animation() {
	const {
		animationSpeed,
		board,
		boardSize,
		showLines,
	} = useContext(BoardContext)

	useEffect(function removeSVG() {
		document.querySelectorAll("svg")
			.forEach(function remove(svg) {
				svg.remove()
			})
	}, [board, boardSize, showLines, animationSpeed])

	useEffect(function animateBoardOnStateChange() {
		const buttons = [...document.querySelectorAll(".board-button")]

		board.forEach(function colorizeCellAndCreateLine(move, index) {
			let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
			let pathString = ""
			svg.setAttributeNS(null, 'width', '100%')
			svg.setAttributeNS(null, 'height', '100%')
			let blackLine = document.createElementNS("http://www.w3.org/2000/svg", "path")
			let coloredLine = document.createElementNS("http://www.w3.org/2000/svg", "path")

			setTimeout(function showMovesStepByStep() {
				const button = buttons.find(function getCurrentButton(b) {
					return b.innerHTML === move.name
				})
				const hue = Math.floor(index * (270 / board.length))

				if (showLines && index > 0) {
					// Draw SVG line from this button to next
					const { left, width, top, height } = button.getBoundingClientRect()
					const x = left + width / 2
					const y = top + height / 2
					const previousButton = buttons.find(function getPreviousButton(b) {
						return b.innerHTML === board[index - 1].name
					})
					const previousClientRect = previousButton.getBoundingClientRect()
					const previous = {
						left: previousClientRect.left,
						width: previousClientRect.width,
						top: previousClientRect.top,
						height: previousClientRect.height,
					}
					console.log(previous.left, previous.width, previous.top, previous.height)
					const previousX = previous.left + previous.width / 2
					const previousY = previous.top + previous.height / 2

					pathString += `M ${x} ${y} L ${previousX} ${previousY}`

					blackLine.setAttributeNS(null, "d", pathString);
					blackLine.setAttributeNS(null, 'stroke', "black")
					blackLine.setAttributeNS(null, 'stroke-width', "2")
					blackLine.setAttributeNS(null, 'stroke-opacity', "0.5")

					coloredLine.setAttributeNS(null, "d", pathString);
					coloredLine.setAttributeNS(null, 'stroke', `hsl(${hue}, 100%, 50%)`)
					coloredLine.setAttributeNS(null, 'stroke-width', "1")
					blackLine.setAttributeNS(null, 'stroke-opacity', "0.5")

					svg.appendChild(blackLine)
					svg.appendChild(coloredLine)

					svg.style.position = "absolute"
					svg.style.left = 0
					svg.style.bottom = 0
					document.body.appendChild(svg)
				}

				if (button !== undefined) {
					// button.innerHTML += ` (${index + 1})`
					button.classList.add("active")
					if (index === 0) {
						button.style.borderColor = "white"
					}
					button.style.backgroundColor = `hsl(${hue}, 50%, 80%)`
					button.style.color = "black"
				}
			}, index * animationSpeed)
		})
	}, [board])
	return <></>
}

export default Animation
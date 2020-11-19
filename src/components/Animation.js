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
		document.querySelectorAll("svg").forEach(svg => svg.remove())
	}, [board, boardSize, showLines, animationSpeed])

	useEffect(function animateBoardOnStateChange() {
		const buttons = [...document.querySelectorAll(".board-button")]

		board.forEach((move, index) => {
			let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
			let pathString = ""
			svg.setAttributeNS(null, 'width', '100%')
			svg.setAttributeNS(null, 'height', '100%')
			let blackLine = document.createElementNS("http://www.w3.org/2000/svg", "path")
			let coloredLine = document.createElementNS("http://www.w3.org/2000/svg", "path")

			setTimeout(() => {
				const button = buttons.find(b => b.innerHTML === move.name)
				const hue = Math.floor(index * (270 / board.length))


				if (showLines && index < board.length - 1) {
					// Draw SVG line from this button to next
					const { left, width, top, height } = button.getBoundingClientRect()
					const x = left + width / 2
					const y = top + height / 2
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

					pathString += `M ${x} ${y} L ${nextX} ${nextY}`

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
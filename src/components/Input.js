import styled from "styled-components"
import { useEffect, useRef } from "react"

const Form = styled.form`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: space-around;

	@media (min-width: 728px) {
		flex-wrap: nowrap;
	}

	label {
		padding: 0.5rem;
	}

	button {
		padding: 1rem;
		font-size: 1rem;
		margin: 1rem;
		margin-bottom: 0;
	}

	p {
		margin-top: 1rem;
		user-select: none;
	}
`
const BoardSizeInput = styled.input`
	border: 1px solid black;
	padding: 0.5rem;
`
const Slider = styled.input`
	min-width: 33vw;
	display: inline-block;
`
function Input({
	animate, setAnimate,
	animationSpeed,
	boardSize, setBoardSize,
	resetButton, setResetButton,
	board, setBoard,
}) {
	const animationSpeedP = useRef(null)

	function deleteSVGs() {
		document.querySelectorAll("svg").forEach(svg => svg.remove())
	}

	function enableAllInputs() {
		document.querySelectorAll("input")
			.forEach(input => input.disabled = false)
		console.log("lol")
	}

	function reset(event) {
		event.preventDefault()
		enableAllInputs()
		deleteSVGs()
		document.querySelectorAll("button")
			.forEach(btn => btn.removeAttribute("style"))
		setBoard([])
		setResetButton(!resetButton)
	}

	function boardSizeHandler(event, size) {
		event.preventDefault()
		enableAllInputs()
		setBoardSize(size)
	}

	function createButtons(event) {
		if (event.target.value <= 26) {
			const n = Number(event.target.value)
			setBoardSize(n)
		}
	}

	function toggleAnimationState(event) {
		deleteSVGs()
		setAnimate(event.target.checked)
	}

	function getTimeString(totalMilliseconds) {
		const numberOfCells = boardSize ** 2
		const totalSeconds = totalMilliseconds * numberOfCells / 1000
		const minutes = Math.floor(totalSeconds / 60)
		const seconds = Math.floor(totalSeconds % 60)

		let output = ""
		if (totalSeconds > 60) {
			output = `${minutes}:${String(seconds).padStart(2, "0")}` // 1:01
		} else if (totalSeconds >= 10) {
			output = Math.round(totalSeconds) + "s" // 10s
		} else {
			output = totalSeconds.toFixed(1) + "s" // 9.9s
		}

		return output
	}

	function updateAnimationSpeed(event) {
		animationSpeed.current = Number(event.target.value) || animationSpeed.current
		const output = `Interval: ${animationSpeed.current}ms`
		animationSpeedP.current.innerHTML = `Interval: ${animationSpeed.current} ms`
	}

	return (
		<Form>
			<label htmlFor="num-cells" >
				<BoardSizeInput
					autoFocus
					id="num-cells"
					min="5" // There are no solutions for n < 5
					max="26" // Sticking to the English alphabet
					name="num-cells"
					onChange={createButtons}
					onClick={e => e.target.focus()}
					type="number"
					value={boardSize}
				/>
				<p className="info">  Board size (5-26)</p>
			</label>

			<label htmlFor="buttons">
				<button onClick={e => boardSizeHandler(e, 8)}>8x8</button>
				<button onClick={e => boardSizeHandler(e, 26)}>26x26</button>
				<button onClick={reset}>Clear</button>
			</label>

			<label htmlFor="instant-mode">
				<input
					type="checkbox"
					name="instant-mode"
					id="instant-mode"
					onChange={toggleAnimationState}
				/>
				<p className="info">Animate solution</p>
			</label>

			<label htmlFor="speed">
				<Slider
					type="range"
					name="animation-speed"
					onInput={updateAnimationSpeed}
					min="0"
					max="500"
					step="5"
					disabled={!animate}
				/>
				<p ref={animationSpeedP}>
					{`Interval: ${animationSpeed.current} ms`}
				</p>
			</label>
		</Form>
	)
}

export default Input
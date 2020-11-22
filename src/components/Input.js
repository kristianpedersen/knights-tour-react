import styled from "styled-components"
import { useRef } from "react"

const Form = styled.form`
	display: flex;
	align-items: flex-end;
	justify-content: space-around;

	label, button {
		padding: 1rem;
	}

	label {
		background-color: #d3e3e9;
		border: 1px solid #0596cb;
		margin-top: 1rem;
	}

	button {
		padding: 1rem;
	}

	p {
		margin-top: 1rem;
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
	animationSpeedRef,
	boardSize, setBoardSize,
	resetButton, setResetButton,
	setBoard,
}) {
	const animationSpeedP = useRef(null)

	function reset(event) {
		event.preventDefault()
		document.querySelectorAll("button")
			.forEach(btn => btn.removeAttribute("style"))
		document.querySelectorAll("svg").forEach(svg => svg.remove())
		setBoard([])
		setResetButton(!resetButton)
	}

	function createButtons(event) {
		if (event.target.value <= 26) {
			const n = Number(event.target.value)
			setBoardSize(n)
		}
	}

	function getTimeString(totalMilliSeconds) {
		const totalSeconds = totalMilliSeconds * (boardSize ** 2) / 1000
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
		animationSpeedRef.current = Number(event.target.value) || animationSpeedRef.current
		const output = getTimeString(animationSpeedRef.current)
		animationSpeedP.current.innerHTML = `Interval: ${animationSpeedRef.current} ms(total duration: ${output})`
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
				<p>Board size (5-26)</p>
			</label>

			<button onClick={reset}>Clear</button>

			<label htmlFor="speed">
				<Slider
					type="range"
					name="animation-speed"
					onInput={updateAnimationSpeed}
					min="0"
					max="500"
					step="5"
				/>
				<p ref={animationSpeedP}>{`Interval: ${animationSpeedRef.current} ms(total duration: ${getTimeString(animationSpeedRef.current)})`}</p>
			</label>
		</Form>
	)
}

export default Input
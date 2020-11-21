import styled from "styled-components"

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
	width: 100%;
`

function Input({
	animationSpeed, setAnimationSpeed,
	animationSpeedRef,
	setBoard,
	boardSize, setBoardSize,
}) {

	function reset(event) {
		event.preventDefault()
		document.querySelectorAll("button")
			.forEach(btn => btn.removeAttribute("style"), Math.random() * 2000)
		setBoard(previousBoard => [])
	}

	function createButtons(event) {
		if (event.target.value <= 26) {
			const n = Number(event.target.value)
			setBoardSize(n)
		}
	}

	function updateAnimationSpeed(event) {
		setAnimationSpeed(event.target.value)
		animationSpeedRef.current = event.target.value
	}

	const totalDurationSeconds = (animationSpeed * (boardSize ** 2) / 1000)
	const minutes = Math.floor(totalDurationSeconds / 60)
	const seconds = Math.floor(totalDurationSeconds % 60)
	let output = ""

	if (totalDurationSeconds > 60) {
		output = `${minutes}:${String(seconds).padStart(2, "0")}` // 1:01
	} else if (totalDurationSeconds >= 10) {
		output = Math.round(totalDurationSeconds) + "s" // 10s
	} else {
		output = totalDurationSeconds.toFixed(1) + "s" // 9.9s
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
				<p>Board size</p>
			</label>

			<button onClick={reset}>Clear</button>

			<label htmlFor="speed">
				<Slider
					type="range"
					name="animation-speed"
					onChange={updateAnimationSpeed}
					min="0"
					max="1000"
					step="5"
				/>
				{/* <p>Interval: {animationSpeed} ms (total duration: {output})</p> */}
				<p>Interval: {animationSpeed} ms (total duration: {output})</p>
			</label>
		</Form>
	)
}

export default Input
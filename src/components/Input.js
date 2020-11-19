import { useContext } from "react"
import { BoardContext } from "../BoardContext"
import styled from "styled-components"

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-around;

	label {
		padding: 1rem;
		background-color: #eee;
		border: 1px solid #ddd;
		margin-top: 1rem;
		min-width: 300px;
	}

	button {
		padding: 1rem;
		font-size: 1.25rem;
	}

	p {
		margin-top: 1rem;
	}
`

const BoardSizeInput = styled.input`
	padding: 1rem;
	border: 1px solid black;
	margin-top: 1rem;
	display: inline-block;
	font-size: 1rem;
`

const Slider = styled.input`
	width: 100%;
`

function Input() {
	const {
		animationSpeed: animationSpeedMs, setAnimationSpeed,
		setBoard,
		boardSize, setBoardSize,
	} = useContext(BoardContext)

	function reset(event) {
		event.preventDefault()
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
	}

	const totalDurationSeconds = (animationSpeedMs * (boardSize ** 2) / 1000)
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
					value={animationSpeedMs}
					min="0"
					max="1000"
					step="5"
				/>
				<p>Interval: {animationSpeedMs} ms (total duration: {output})</p>
			</label>
		</Form>
	)
}

export default Input
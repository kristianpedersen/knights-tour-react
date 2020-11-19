import { useContext } from "react"
import { BoardContext } from "../BoardContext"
import styled from "styled-components"

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-around;
`

const Label = styled.label`
	padding: 1rem;
	background-color: #eee;
	border: 1px solid #ddd;
	margin-top: 1rem;
	min-width: 300px;
`

const BigButton = styled.button`
	padding: 1rem;
	font-size: 1.5rem;
`

const BoardSizeInput = styled.input`
	padding: 1rem;
	border: 1px solid black;
	margin-top: 1rem;
	display: inline-block;
`

const Slider = styled.input`
	width: 100%;
`

const P = styled.p`
	margin-top: 1rem;
`

function Input() {
	const {
		animationSpeed, setAnimationSpeed,
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

	const totalDuration = (animationSpeed * (boardSize ** 2) / 1000)
	const minutes = Math.floor(totalDuration / 60)
	const seconds = Math.floor(totalDuration % 60)
	let output = ""

	if (totalDuration > 60) {
		output = `${minutes}:${String(seconds).padStart(2, "0")}` // 1m:08s
	} else if (totalDuration >= 10) {
		output = Math.round(totalDuration) + "s" // 10s
	} else {
		output = totalDuration.toFixed(1) + "s" // 2.5 s
	}

	return (
		<>
			<Form>
				<Label htmlFor="num-cells" >
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
					<P>Board size</P>
				</Label>

				<BigButton onClick={reset}>Clear</BigButton>

				<Label htmlFor="speed">
					<Slider
						type="range"
						name="animation-speed"
						onChange={updateAnimationSpeed}
						value={animationSpeed}
						min="0"
						max="500"
						step="5"
					/>
					<P>Interval: {animationSpeed} ms (total duration: {output})</P>
				</Label>
			</Form>
		</>
	)
}

export default Input
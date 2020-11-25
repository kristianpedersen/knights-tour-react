import { BoardContext } from "../BoardContext"
import { useContext, useRef } from "react"
import styled from "styled-components"

export default function Input() {
	const {
		animationSpeed,
		boardSize, setBoardSize,
		setBoard,
		sliderRef
	} = useContext(BoardContext)
	const animationSpeedP = useRef(null)

	function deleteSVGs() {
		document.querySelectorAll("svg").forEach(svg => svg.remove())
	}

	function reset(event) {
		setBoard([])
		event.preventDefault()
		deleteSVGs()
		document.querySelectorAll("button")
			.forEach(btn => btn.removeAttribute("style"))
	}

	function boardSizeHandler(event, size) {
		event.preventDefault()
		setBoardSize(size)
	}

	function createButtons(event) {
		if (event.target.value <= 26) {
			const n = Number(event.target.value)
			setBoardSize(n)
		}
	}

	function focusBoardSizeInput(e) {
		if (e.target.tagName === "INPUT") {
			e.target.focus()
		}
		if (e.target.tagName === "P") {
			e.target.previousSibling.focus() // Label was clicked
		}
	}

	function updateAnimationSpeed(event) {
		animationSpeed.current = Number(event.target.value) || animationSpeed.current
		animationSpeedP.current.innerHTML = `Interval: ${(animationSpeed.current / 1000).toFixed(2)} s`
	}

	return (
		<Form>
			<label htmlFor="num-cells" onClick={focusBoardSizeInput}>
				<BoardSizeInput
					autoFocus
					className="disable-when-animating"
					min="5" // There are no solutions for n < 5
					max="26" // Sticking to the English alphabet
					name="num-cells"
					onChange={createButtons}
					type="number"
					value={boardSize}
				/>
				<p className="info">Board size (5-26)</p>
			</label>

			<label htmlFor="buttons">
				<button
					className="disable-when-animating"
					onClick={e => boardSizeHandler(e, 8)}>
					8x8
				</button>
				<button
					className="disable-when-animating"
					onClick={e => boardSizeHandler(e, 26)}>
					26x26
				</button>
				<button
					onClick={reset}>
					Clear
				</button>
			</label>

			<label htmlFor="speed">
				<Slider
					min="0"
					max="500"
					name="animation-speed"
					onInput={updateAnimationSpeed}
					onLoad={() => console.log("lol")}
					ref={sliderRef.current}
					step="5"
					type="range"
				/>
				<p ref={animationSpeedP}>
					{`Interval: ${(animationSpeed.current / 1000).toFixed(2)} s`}
				</p>
			</label>
		</Form>
	)
}

const Form = styled.form`
	display: flex;
	align-items: flex-end;
	flex-wrap: wrap;
	justify-content: space-around;

	@media (min-width: 728px) {
		flex-wrap: nowrap;
	}

	label {
		padding: 0.5rem;
		background-color: hsl(194, 53%, 85%);
		border: 1px solid #999;
	}

	button {
		padding: 1rem;
		font-size: 1rem;
		margin: 1rem;
		margin-top: 0;
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
import { useContext } from "react"
import styled from "styled-components"
import { Calculate } from "../Calculate"

const SingleCell = styled.button`
		border: 1px solid;
		display: inline;
		transition: all .25s ease-out;
		border-color: #999;
		cursor: pointer;
		
		&:hover {
			box-shadow: 0 0 10px white;
		}

		&.active:hover{
			box-shadow: 0 0 10px black;
		}
	`

function Cell({ name, x, y, setBoard, setHistory, boardSize }) {
	function disableAllButtonsAndCalculate() {
		const { history, playback } = Calculate(x, y, boardSize)
		setBoard(history)
		setHistory(playback)
	}


	return (
		<SingleCell
			className="board-button"
			onClick={disableAllButtonsAndCalculate}
		>
			{name}
		</SingleCell>
	)
}

export default Cell
import { useContext } from "react"
import styled from "styled-components"
import Calculate from "../Calculate"
import { BoardContext } from "../BoardContext"

const SingleCell = styled.div`
		border: 1px solid;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all .2s ease;
		border-color: #999;
		cursor: pointer;
		
		&:hover {
			box-shadow: 0 0 10px white;
		}

		&.active:hover{
			box-shadow: 0 0 10px black;
		}
	`

function Cell({ name, x, y }) {
	const {
		boardSize,
		setBoard,
		setHistory,
	} = useContext(BoardContext)

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
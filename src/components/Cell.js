import { useContext } from "react"
import styled from "styled-components"
import Calculate from "../Calculate"
import { BoardContext } from "../BoardContext"
import { motion, animatepres } from "framer-motion"

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
		<div
			className="board-button"
			onClick={disableAllButtonsAndCalculate}
		>
			{name}
		</div>
	)
}

export default Cell
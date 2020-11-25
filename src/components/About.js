import { BoardContext } from "../BoardContext"
import { motion } from "framer-motion"
import { useContext, useEffect } from "react"
import styled from "styled-components"
import Modal from "react-modal"

export default function About() {
	const {
		modalIsOpen, setModalIsOpen,
		variants
	} = useContext(BoardContext)

	const modalStyle = {

	}

	function closeModal() {
		setModalIsOpen(false)
	}

	Modal.setAppElement("#root")
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
		>
			<AboutDiv {...{ variants }}>
				<h1>About the knight's tour</h1>
				<ul>
					<li>The knight can only move to a position where xDistance=1 and yDistance=2, or vice versa.</li>
					<li>For each move, we find all valid moves, and choose the one that has the fewest options. This is known as Warnsdorff's rule.</li>
					<li>As a fun challenge, I made the algorithm without seeing other implementations, so it can probably be improved a lot.</li>
				</ul>
				<h1>Help wanted!</h1>
				<p>I'd love to see your improvements and suggestions: <a hreF="https://github.com/KristianPedersen/knights-tour-react">GitHub repo</a></p>
			</AboutDiv>
		</Modal>
	)
}

const AboutDiv = styled(motion.div).attrs(({ variants }) => ({
	initial: variants.out,
	animate: variants.in,
	exit: variants.out,
}))`
	justify-content: center;
	background-color: #eee;
	font-family: sans-serif;
	padding: 2rem;
	border-radius: 4px;
	border: 1px solid #aaa;

	h1 {
		padding: 1rem 0;
	}

	li {
		margin: 1rem 0;
	}
`
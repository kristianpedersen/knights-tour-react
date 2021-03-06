import { BoardContext } from "../BoardContext"
import { motion } from "framer-motion"
import { useContext } from "react"
import styled from "styled-components"
import Modal from "react-modal"
import { AnimatePresence } from "framer-motion"

export default function About() {
	const {
		modalIsOpen, setModalIsOpen,
		variants
	} = useContext(BoardContext)

	function closeModal() {
		setModalIsOpen(false)
	}

	Modal.setAppElement("#root")
	return (
		<AnimatePresence exitBeforeEnter>
			<Modal
				isOpen={modalIsOpen}
			// onRequestClose={() => setTimeout(closeModal, 1000)}
			>
				<AboutDiv {...{ variants }}>
					<h1>About the knight's tour</h1>
					<p><a href="https://www.wikiwand.com/en/Knight%27s_tour">Read more at Wikipedia</a></p>
					<ul>
						<li>The knight can only move to a position where xDistance=1 and yDistance=2, or vice versa.</li>
						<li>For each move, we find all valid moves, and choose the one that has the fewest onwards moves. This is known as Warnsdorff's rule.</li>
						<li>As a personal challenge, I made the algorithm without seeing other implementations, so I'm sure there are improvements to be made.</li>
					</ul>
					<h1>Help wanted!</h1>
					<p>I'd love to see your improvements and suggestions: <a href="https://github.com/KristianPedersen/knights-tour-react">GitHub repo</a></p>
				</AboutDiv>
			</Modal>
		</AnimatePresence>
	)
}

const AboutDiv = styled(motion.div).attrs(({ variants }) => ({
	initial: variants.out,
	animate: variants.in,
	exit: variants.out,
}))`
	background-color: #eee;
	border-radius: 4px;
	border: 1px solid #aaa;
	font-family: sans-serif;
	justify-content: center;
	padding: 2rem;

	h1 {
		padding: 1rem 0;
	}

	li {
		margin: 1rem 0;
	}
`
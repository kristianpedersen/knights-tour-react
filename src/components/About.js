import { BoardContext } from "../BoardContext"
import { motion } from "framer-motion"
import { useContext } from "react"
import styled from "styled-components"

export default function About() {
	const { variants } = useContext(BoardContext)
	return (
		<AboutDiv {...{ variants }}>
			<h1>About the algorithm</h1>
			<ul>
				<li>The knight can only move to a position where xDistance=1 and yDistance=2, or vice versa.</li>
				<li>For each move, we find all valid moves, and choose the one that has the fewest options. This is known as Warnsdorff's rule.</li>
				<li>This was just a personal challenge I made for myself, so I haven't looked at other implementations.</li>
			</ul>
			<h1>Help wanted!</h1>
			<p>I would love to see any aspect of this site improved! <a hreF="https://github.com/KristianPedersen/knights-tour-react">Submit your pull requests @ Github</a></p>
		</AboutDiv>
	)
}

const AboutDiv = styled(motion.div).attrs(({ variants }) => ({
	initial: variants.out,
	animate: variants.in,
	exit: variants.out,
}))`
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-left: 30px;

	h1 {
		padding: 1rem 0;
	}

	li {
		margin: 1rem 0;
	}
`
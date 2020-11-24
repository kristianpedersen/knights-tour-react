import { useEffect } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"

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


function About({ showAbout, variants }) {
	// useEffect(function removeSVG() {
	// 	document.querySelectorAll("svg").forEach(svg => svg.remove())
	// }, [])

	return (
		<AboutDiv {...{ variants }}>
			<h1>About the algorithm</h1>
			<ul>
				<li>The knight can only move to a position where xDistance=1 and yDistance=2, or vice versa.</li>
				<li>For each move, we find all valid moves, and choose the one that has the fewest options. This is known as Warnsdorff's rule.</li>
				<li>This was just a personal challenge for me, so I haven't looked at other implementations. I will happily accept corrections!</li>
			</ul>
		</AboutDiv>
	)
}

export default About
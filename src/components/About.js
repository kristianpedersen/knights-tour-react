import { useEffect } from "react"
import styled from "styled-components"

const AboutDiv = styled.div`
	text-align: left;
	padding-left: 25%;
	h1 {
		padding: 1rem 0;
	}

	li {
		margin: 1rem 0;
	}
`

function About() {
	useEffect(function removeSVG() {
		document.querySelectorAll("svg").forEach(svg => svg.remove())
	}, [])

	return (
		<AboutDiv>
			<h1>About the algorithm</h1>
			<ul>
				<li>The knight can only move to a position where xDistance=1 and yDistance=2, or vice versa.</li>
				<li>For each move, we find all valid moves, and choose the one that has the fewest possibilities. This is known as Warnsdorff's rule.</li>
				<li>This was just a personal challenge for me, so I haven't looked at other implementations. I will happily accept corrections! :)</li>
			</ul>
		</AboutDiv>

		// 	Fetch images from Wikipedia article
		// https://en.wikipedia.org/w/api.php?action=opensearch&limit=5&format=xml&search=knights%20tour&namespace=0
		// ...
	)
}

export default About
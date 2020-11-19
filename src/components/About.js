import { useEffect } from "react"

function About() {
	useEffect(function removeSVG() {
		document.querySelectorAll("svg").forEach(svg => svg.remove())
	}, [])

	return (
		<>
			<p>About</p>
		</>
	)
}

export default About
import { useEffect } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"
import wget from "wget-improved"

function About({ setCancelAnimation, variants }) {
	useEffect(() => {
		setCancelAnimation(true)
		const options = {
			protocol: 'https',
			host: 'en.wikipedia.org',
			path: '/wiki/Knight%27s_tour',
			proxy: 'http://localhost:3000',
			method: 'GET'
		};
		let req = wget.request(options, function (res) {
			let content = '';
			if (res.statusCode === 200) {
				res.on('error', function (err) {
					console.log(err);
				});
				res.on('data', function (chunk) {
					content += chunk;
				});
				res.on('end', function () {
					console.log(content);
				});
			} else {
				console.log('Server respond ' + res.statusCode);
			}
		});

		req.end();
		req.on('error', function (err) {
			console.log(err);
		});
	}, [])

	return (
		<AboutDiv {...{ variants }}>
			<h1>About the algorithm</h1>
			<ul>
				<li>The knight can only move to a position where xDistance=1 and yDistance=2, or vice versa.</li>
				<li>For each move, we find all valid moves, and choose the one that has the fewest options. This is known as Warnsdorff's rule.</li>
				<li>This was just a personal challenge for me, so I haven't looked at other implementations.</li>
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

export default About
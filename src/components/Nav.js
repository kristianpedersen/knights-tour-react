import styled from "styled-components"
import { NavLink } from "react-router-dom"

export default function Menu() {
	return (
		<Nav>
			<h1>Knight's Tour</h1>
			<ul>
				<NavLink exact to="/knights-tour-react"><li>Board</li></NavLink>
				<NavLink onClick={() => {
					document.querySelectorAll("svg").forEach(svg => svg.remove())
				}} to="/knights-tour-react/about"><li>About</li></NavLink>
			</ul>
		</Nav>
	)
}

const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	background: hsl(350, 50%, 50%);
	color: white;
	box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
	border-bottom: 1px solid black;

	ul{
		display: flex;
		flex-direction: column;
		list-style: none;
	}

	@media (min-width: 768px) {
		ul {
			flex-direction: row;
		}
	}

	li {
		padding: 0 5rem;
		cursor: pointer;
		color: white;
		text-decoration: none;
	}
`
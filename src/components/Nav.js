import styled from "styled-components"
import { NavLink } from "react-router-dom"

const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	padding: 2rem;
	background: hsl(350, 50%, 50%);
	color: white;
	box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
	border-bottom: 1px solid black;

	ul{
		display: flex;
		list-style: none;
	}

	li {
		padding: 0 5rem;
		cursor: pointer;
	}

	li.active {
		text-decoration: underline;
		font-weight: bold;
	}
`

function Menu({ title }) {
	return (

		<Nav>
			<h1>{title}</h1>
			<ul>
				<NavLink exact to="/"><li className="active">Board</li></NavLink>
				<NavLink to="/about"><li>About</li></NavLink>
			</ul>
		</Nav>

	)
}

export default Menu
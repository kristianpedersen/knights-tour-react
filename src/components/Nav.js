import styled from "styled-components"
import { Switch, Route } from "react-router-dom"

function Menu({ title }) {
	const Nav = styled.nav`
		display: flex;
		justify-content: space-between;
		padding: 2rem;
		background: hsl(350, 50%, 50%);
		color: white;
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
	return (
		<Nav>
			<h1>{title}</h1>
			<ul>
				<li className="active">Board</li>
				<li>About</li>
			</ul>
		</Nav>
	)
}

export default Menu
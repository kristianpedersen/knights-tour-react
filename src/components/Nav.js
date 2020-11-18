import styled from "styled-components"
import { Switch, Route } from "react-router-dom"

function Menu({ title }) {
	const Nav = styled.nav`
		display: flex;
		justify-content: space-between;
		padding: 2rem;
		background: hsl(130, 50%, 85%);

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
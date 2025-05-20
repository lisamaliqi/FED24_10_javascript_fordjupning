import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import { useContext } from "react";

const Navigation = () => {

	const themeContext = useContext(ThemeContext);

	if (!themeContext) {
		throw new Error("Trying to use ThemeContext outside of its provider, SRSLY?!!111");
	};

	//destructing
	const { isDarkMode, toggleTheme } = themeContext;

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">🕵🏻‍♂️ Hacker News</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/search">Search</Nav.Link>
					</Nav>
				</Navbar.Collapse>

				<Button onClick={toggleTheme} variant="outline-secondary">
					{isDarkMode ? '🌞' : '🌚'}
				</Button>
			</Container>
		</Navbar>
	)
}

export default Navigation;

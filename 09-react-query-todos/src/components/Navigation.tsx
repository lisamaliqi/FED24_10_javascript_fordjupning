import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router";

const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">📝 Better Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/todos/create" end>Create Todo</Nav.Link>
						<Nav.Link as={NavLink} to="/todos" end>Todos</Nav.Link> {/* 'end' is for match ONLY if URL ENDS with /todos */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
};

export default Navigation;

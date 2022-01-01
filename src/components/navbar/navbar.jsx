import React from 'react';
import ReactDom from 'react-dom';
import { render } from 'react-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

// export default class NavBar extends React.Component {
// export default function NavBar({ user }) {
export default function NavBar({ user }) {
	// Need to implement routing on the nav buttons. I assume this will be done with react-router
	// render() {
	const onLoggedOut = () => {
		localStorage.clear();
		window.open('/', '_self');
	};

	const isAuth = () => {
		if (typeof window == 'undefined') {
			return false;
		}
		if (localStorage.getItem('token')) {
			return localStorage.getItem('token');
		} else {
			return;
		}
	};

	return (
		<Navbar bg="primary" expand="lg" variant="dark" sticky="top">
			<Container>
				<Navbar.Brand href="/" style={{ fontSize: '2.5rem' }}>
					MyFlix
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" style={{ fontSize: '1.2rem' }}>
					<Nav className="me-auto">
						{isAuth() && <Nav.Link href="/">Movies</Nav.Link>}
						{isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
						{/* {isAuth() && <Nav.Link href="#">Profile</Nav.Link>} */}
					</Nav>
					<Nav className="justify-content-right">
						{!isAuth() && <Nav.Link href="/register">Sign Up</Nav.Link>}
						{!isAuth() && <Nav.Link href="/">Log In</Nav.Link>}
						{isAuth() && (
							<Nav.Link href="#" onClick={() => onLoggedOut()}>
								Log Out
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
	// }
}

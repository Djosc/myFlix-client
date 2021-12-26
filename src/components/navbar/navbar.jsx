import React from 'react';
import ReactDom from 'react-dom';
import { render } from 'react-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

export default class NavBar extends React.Component {
	// Need to implement routing on the nav buttons. I assume this will be done with react-router
	render() {
		return (
			<Navbar bg="primary" expand="lg" variant="dark" sticky="top">
				<Container>
					<Navbar.Brand href="#" style={{ fontSize: '2.5rem' }}>
						MyFlix
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" style={{ fontSize: '1.2rem' }}>
						<Nav className="me-auto">
							<Nav.Link href="#">Movies</Nav.Link>
							<Nav.Link href="#">Profile</Nav.Link>
						</Nav>
						<Nav>
							<Nav.Link href="#" className="justify-content-right">
								Log Out
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}

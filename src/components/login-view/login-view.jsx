import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Form, Button, Row, Col, FloatingLabel, Card } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		/* Send a request to the server for authentication
        Then call this.props.onLoggedIn(username)
    */
		axios
			.post('https://david-caldwell-myflix.herokuapp.com/login', {
				Username: username,
				Password: password,
			})
			.then((response) => {
				const data = response.data;
				props.onLoggedIn(data);
			})
			.catch((e) => {
				console.log('no such user');
			});
		// props.onLoggedIn(username);
	};

	const handleNewUser = (e) => {
		e.preventDefault();
		props.onRegister(false);
	};

	return (
		<Container>
			<div className="login-form">
				<Row className="justify-content-center" style={{ marginTop: '20%' }}>
					<Col lg={6} md={8} className="text-center">
						<Card>
							<Card.Body className="text-center">
								<Card.Title as="h2" className="text-center">
									Log in
								</Card.Title>
								<FloatingLabel
									className="my-4 mx-4"
									controlId="floatingUsername"
									label="Username"
								>
									<Form.Control
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
										placeholder="Username Example"
									/>
								</FloatingLabel>
								<FloatingLabel
									className="my-4 mx-4"
									controlId="floatingPassword"
									label="Password (must be at least 8 characters)"
								>
									<Form.Control
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										minLength="8"
										placeholder="Password Example"
									/>
								</FloatingLabel>
								<Button size="lg" variant="primary" type="submit" onClick={handleSubmit}>
									Log In
								</Button>
							</Card.Body>
						</Card>
						<Button variant="link" className="pt-3" onClick={handleNewUser}>
							New User? Register here
						</Button>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

LoginView.propTypes = {
	onLoggedIn: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel, Card } from 'react-bootstrap';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		props.onRegister(true);
	};

	const handleNewUser = (e) => {
		e.preventDefault();
		props.onRegister(false);
	};

	return (
		<Container>
			<Row className="justify-content-center" style={{ marginTop: '15%' }}>
				<Col lg={6} md={8} className="text-center">
					<Card>
						<Card.Body className="text-center py-4">
							<Card.Title as="h2">Register for myFlix</Card.Title>
							<FloatingLabel
								className="mx-4 my-4"
								controlId="usernameInput"
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
								className="mx-4 my-4"
								controlId="passwordInput"
								label="Password (must be at least 8 characters)"
							>
								<Form.Control
									type="text"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									placeholder="Password Example"
								/>
							</FloatingLabel>
							<FloatingLabel className="mx-4 my-4" controlId="emailInput" label="Email">
								<Form.Control
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									placeholder="email Example"
								/>
							</FloatingLabel>
							<FloatingLabel
								className="mx-4 my-4"
								controlId="birthdayInput"
								label="Birthday"
							>
								<Form.Control
									type="text"
									value={birthday}
									onChange={(e) => setBirthday(e.target.value)}
									required
									placeholder="Birthday Example"
								/>
							</FloatingLabel>
							<Button size="lg" variant="primary" type="submit" onClick={handleSubmit}>
								Register
							</Button>
						</Card.Body>
					</Card>
					<Button variant="link" className="pt-3" onClick={handleSubmit}>
						Existing User? Login here
					</Button>
				</Col>
			</Row>
		</Container>
	);
}

RegistrationView.propTypes = {
	onRegister: PropTypes.func.isRequired,
};

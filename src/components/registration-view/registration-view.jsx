import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useState } from 'react';
import { Container, Form, Button, Row, Col, FloatingLabel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const [usernameErr, setUsernameErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');
	const [emailErr, setEmailErr] = useState('');

	const validate = () => {
		let isReq = true;
		if (!username) {
			setUsernameErr('Username Required');
			isReq = false;
		} else if (username.length < 4) {
			setUsernameErr('Username must be at least 4 characters long');
			isReq = false;
		}
		if (!password) {
			setPasswordErr('Password Required');
			isReq = false;
		} else if (password.length < 8) {
			setPasswordErr('Password must be at least 8 characters long');
			isReq = false;
		}
		if (!email) {
			setEmailErr('Email Required');
			isReq = false;
		} else if (email.indexOf('@') === -1) {
			setEmailErr('Enter Valid Email Address');
			isReq = false;
		}

		return isReq;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isReq = validate();

		if (isReq) {
			props.onRegister(true);

			axios
				.post('https://david-caldwell-myflix.herokuapp.com/users', {
					Username: username,
					Password: password,
					Email: email,
					Birthday: birthday,
				})
				.then((response) => {
					const data = response.data;
					console.log(data);
					alert('Succesfully Registered');
					window.open('/', '_self');
				})
				.catch((e) => {
					console.log('error registering the user');
				});
		}
	};

	return (
		<Container>
			<Row className="justify-content-center" style={{ marginTop: '10%' }}>
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
							{usernameErr && (
								<h6 style={{ color: 'red', marginBottom: '20px' }}>{usernameErr}</h6>
							)}
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
							{passwordErr && (
								<h6 style={{ color: 'red', marginBottom: '20px' }}>{passwordErr}</h6>
							)}
							<FloatingLabel className="mx-4 my-4" controlId="emailInput" label="Email">
								<Form.Control
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									placeholder="email Example"
								/>
							</FloatingLabel>
							{emailErr && (
								<h6 style={{ color: 'red', marginBottom: '20px' }}>{emailErr}</h6>
							)}
							<FloatingLabel
								className="mx-4 my-4"
								controlId="birthdayInput"
								label="Birthday (YYYY-MM-DD)"
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
					<Link to={'/'}>
						<Button variant="link" className="pt-3">
							Existing User? Login here
						</Button>
					</Link>
				</Col>
			</Row>
		</Container>
	);
}

RegistrationView.propTypes = {
	onRegister: PropTypes.func.isRequired,
};

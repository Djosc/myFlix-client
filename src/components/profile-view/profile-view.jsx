import React from 'react';
import axios from 'axios';
import {
	Button,
	Row,
	Col,
	Navbar,
	Container,
	Card,
	FloatingLabel,
	Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setUserData } from '../../actions/actions';
import { useState } from 'react';

import UserInfo from './user-info';

import './profile-view.scss';

function ProfileView({ movies, onBackClick, user, userData }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const [usernameErr, setUsernameErr] = useState('');
	const [passwordErr, setPasswordErr] = useState('');
	const [emailErr, setEmailErr] = useState('');

	const updateUser = () => {
		const user = localStorage.getItem('user');
		const authToken = localStorage.getItem('token');

		let isReq = validate();
		if (isReq) {
			axios
				.put(
					`https://david-caldwell-myflix.herokuapp.com/users/${user}`,
					{
						Username: username,
						Password: password,
						Email: email,
						Birthday: birthday,
					},
					{ headers: { Authorization: `Bearer ${authToken}` } }
				)
				.then((response) => {
					setUserData({
						Username: response.data.Username,
						Password: response.data.Password,
						Email: response.data.Email,
						Birthday: response.data.Birthday,
					});
					console.log(response.data);

					localStorage.setItem('user', response.data.Username);
					alert('Profile has been updated');
					window.location.reload();
				})
				.catch((err) => console.log(err));
		}
	};

	const deleteUser = () => {
		const user = localStorage.getItem('user');
		const authToken = localStorage.getItem('token');

		axios
			.delete(`https://david-caldwell-myflix.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${authToken}` },
			})
			.then((response) => {
				console.log(response.data);
				alert('Account has been deleted');
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				window.open('/', '_self');
			});
	};

	const validate = () => {
		let isReq = true;
		if (username.length < 4) {
			setUsernameErr('Username must be at least 4 characters long');
			isReq = false;
		}

		if (password.length < 8) {
			setPasswordErr('Password must be at least 8 characters long');
			isReq = false;
		}

		if (email.indexOf('@') === -1) {
			setEmailErr('Enter Valid Email Address');
			isReq = false;
		}
		return isReq;
	};

	return (
		<>
			<Row className="justify-content-center">
				<Col md={6} sm={10} className="">
					<UserInfo
						userName={userData.Username}
						passWord={userData.Password}
						email={userData.Email}
						birthday={userData.Birthday}
						favoriteMovies={userData.FavoriteMovies}
						movies={movies}
					/>
				</Col>

				<Col md={6} sm={10}>
					<Card>
						<Card.Body className="text-center py-4">
							<Card.Title as="h2">Update Account Details</Card.Title>
							<FloatingLabel
								className="mx-4 my-4"
								controlId="usernameInput"
								label="Username"
							>
								<Form.Control
									type="text"
									onChange={(e) => setUsername(e.target.value)}
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
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password Example"
								/>
							</FloatingLabel>
							{passwordErr && (
								<h6 style={{ color: 'red', marginBottom: '20px' }}>{passwordErr}</h6>
							)}
							<FloatingLabel className="mx-4 my-4" controlId="emailInput" label="Email">
								<Form.Control
									type="text"
									onChange={(e) => setEmail(e.target.value)}
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
									onChange={(e) => setBirthday(e.target.value)}
									placeholder="Birthday Example"
								/>
							</FloatingLabel>
							<Button
								className="mx-4"
								size="lg"
								variant="primary"
								type="submit"
								onClick={updateUser}
							>
								Update
							</Button>
							<Button
								className="mx-4"
								size="lg"
								variant="danger"
								type="submit"
								onClick={deleteUser}
							>
								Delete Account
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<Button
					className="back-button"
					variant="primary"
					size="lg"
					onClick={() => onBackClick()}
				>
					Back
				</Button>
			</Row>
		</>
	);
}

let matchStateToProps = (state) => {
	const { userData } = state;
	return { userData };
};

export default connect(matchStateToProps, { setUserData })(ProfileView);

ProfileView.propTypes = {
	movies: PropTypes.array,
	onBackClick: PropTypes.func,
	user: PropTypes.bool,
	userData: PropTypes.object,
	setUserData: PropTypes.func,
};

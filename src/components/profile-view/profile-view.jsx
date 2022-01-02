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
import { useState } from 'react'

import UserInfo from './user-info';
// import UserUpdateForm from './user-update-form';

class ProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Username: null,
			Password: null,
			Email: null,
			Birthday: null,
			FavoriteMovies: [],
		};
	}

	const [error, setError] = useState('')

	componentDidMount() {
		const authToken = localStorage.getItem('token');
		this.getUser(authToken);
	}

	getUser(token) {
		const username = localStorage.getItem('user');
		axios
			.get(`https://david-caldwell-myflix.herokuapp.com/users/${username}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					Username: response.data.Username,
					Password: response.data.Password,
					Email: response.data.Email,
					Birthday: response.data.Birthday,
					FavoriteMovies: response.data.FavoriteMovies,
				});
			})
			.catch((err) => console.log(err));
	}

	updateUser = (e) => {
		e.preventDefault();
		const username = localStorage.getItem('user');
		const authToken = localStorage.getItem('token');

		axios
			.put(
				`https://david-caldwell-myflix.herokuapp.com/users/${username}`,
				{
					Username: this.state.Username,
					Password: this.state.Password,
					Email: this.state.Email,
					Birthday: this.state.Birthday,
				},
				{ headers: { Authorization: `Bearer ${authToken}` } }
			)
			.then((response) => {
				this.setState({
					Username: response.data.Username,
					Password: response.data.Password,
					Email: response.data.Email,
					Birthday: response.data.Birthday,
				});

				localStorage.setItem('user', this.state.Username);
				alert('Profile has been updated');
				window.location.reload();
			})
			.catch((err) => console.log(err));
	};

	deleteUser = (e) => {
		e.preventDefault();
		const username = localStorage.getItem('user');
		const authToken = localStorage.getItem('token');

		axios
			.delete(`https://david-caldwell-myflix.herokuapp.com/users/${username}`, {
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

	setUsername(value) {
		this.state.Username = value;
	}

	setPassword(value) {
		this.state.Password = value;
	}

	setEmail(value) {
		this.state.Email = value;
	}

	setBirthday(value) {
		this.state.Birthday = value;
	}

	validate = () => {

	}

	render() {
		const { onBackClick, movies, onLoggedOut } = this.props;
		return (
			<Row>
				<Col>
					<UserInfo
						userName={this.state.Username}
						passWord={this.state.Password}
						email={this.state.Email}
						birthday={this.state.Birthday}
						favoriteMovies={this.state.FavoriteMovies}
						movies={movies}
					/>
				</Col>
				<Col>
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
									onChange={(e) => this.setUsername(e.target.value)}
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
									onChange={(e) => this.setPassword(e.target.value)}
									placeholder="Password Example"
								/>
							</FloatingLabel>
							<FloatingLabel className="mx-4 my-4" controlId="emailInput" label="Email">
								<Form.Control
									type="text"
									onChange={(e) => this.setEmail(e.target.value)}
									placeholder="email Example"
								/>
							</FloatingLabel>
							<FloatingLabel
								className="mx-4 my-4"
								controlId="birthdayInput"
								label="Birthday (YYYY-MM-DD)"
							>
								<Form.Control
									type="text"
									onChange={(e) => this.setBirthday(e.target.value)}
									placeholder="Birthday Example"
								/>
							</FloatingLabel>
							<Button
								className="mx-4"
								size="lg"
								variant="primary"
								type="submit"
								onClick={this.updateUser}
							>
								Update
							</Button>
							<Button
								className="mx-4"
								size="lg"
								variant="danger"
								type="submit"
								onClick={this.deleteUser}
							>
								Delete Account
							</Button>
						</Card.Body>
					</Card>
				</Col>
				<Button className="" variant="primary" size="lg" onClick={onBackClick}>
					Back
				</Button>
			</Row>
		);
	}
}

export default ProfileView;

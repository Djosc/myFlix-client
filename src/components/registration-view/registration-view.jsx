import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		props.onRegister(true, username);
	};

	const handleExistingUser = (e) => {
		e.preventDefault();
		props.onExistingUser(true);
	};

	return (
		<div className="registration-view">
			<h1>Register for myFlix:</h1>
			<form>
				<label>
					Create Username:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Create Password:
					<input
						type="text"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<label>
					Enter Email:
					<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>
				<label>
					Enter Birthday:
					<input
						type="text"
						value={birthday}
						onChange={(e) => setBirthday(e.target.value)}
					/>
				</label>

				<button type="submit" onClick={handleSubmit}>
					Register
				</button>
			</form>

			<label>
				Existing User?
				<button type="submit" onClick={handleExistingUser}>
					Login
				</button>
			</label>
		</div>
	);
}

RegistrationView.propTypes = {
	onExistingUser: PropTypes.func.isRequired,
	onRegister: PropTypes.func.isRequired,
};

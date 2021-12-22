import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		/* Send a request to the server for authentication
        Then call this.props.onLoggedIn(username)
    */
		props.onLoggedIn(username);
		props.onExistingUser(false);
		props.onRegister(true, username);
	};

	return (
		<form>
			<label>
				Username:
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</label>
			<label>
				Password:
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<button type="button" onClick={handleSubmit}>
				Submit
			</button>
		</form>
	);
}

LoginView.propTypes = {
	onLoggedIn: PropTypes.func.isRequired,
	onExistingUser: PropTypes.func.isRequired,
	onRegister: PropTypes.func.isRequired,
};

import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

class MainView extends React.Component {
	constructor() {
		super();
		// Initial state is set to null
		this.state = {
			movies: [],
			selectedMovie: null,
			user: null,
			registered: false,
			existingUser: false,
		};
	}

	componentDidMount() {
		axios
			.get('https://david-caldwell-myflix.herokuapp.com/movies')
			.then((res) => {
				this.setState({
					movies: res.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	/**
	 * When a movie is clicked, this function is invoked
	 * and updates the state of the `selectedMovie` *property to that movie*
	 */
	setSelectedMovie(newSelectedMovie) {
		this.setState({
			selectedMovie: newSelectedMovie,
		});
	}

	/**
	 * When a user successfully logs in,
	 * this function updates the `user` property in state to that *particular user*
	 */
	onLoggedIn(user) {
		this.setState({
			user,
		});
	}

	onRegister(registered) {
		this.setState({
			registered,
		});
	}

	onExistingUser(existingUser) {
		this.setState({
			existingUser,
		});
	}

	render() {
		const { movies, selectedMovie, registered, user, existingUser } = this.state;

		if (!registered) {
			return (
				<RegistrationView onRegister={(registered) => this.onRegister(registered)} />
			);
		}

		if (!user) {
			return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
		}

		if (movies.length === 0) return <div className="main-view" />;

		return (
			<div className="main-view">
				{selectedMovie ? (
					<MovieView
						movieData={selectedMovie}
						onBackClick={(newSelectedMovie) => {
							this.setSelectedMovie(newSelectedMovie);
						}}
					/>
				) : (
					movies.map((movie) => (
						<MovieCard
							key={movie._id}
							movieData={movie}
							onMovieClick={(movie) => {
								this.setSelectedMovie(movie);
							}}
						/>
					))
				)}
			</div>
		);
	}
}

export default MainView;

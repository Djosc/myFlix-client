import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

	render() {
		const { movies, selectedMovie, registered, user } = this.state;

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
			<Row className="main-view justify-content-md-center">
				{selectedMovie ? (
					<Col md={8}>
						<MovieView
							movieData={selectedMovie}
							onBackClick={(newSelectedMovie) => {
								this.setSelectedMovie(newSelectedMovie);
							}}
						/>
					</Col>
				) : (
					movies.map((movie) => (
						<Col lg={3} md={6}>
							<MovieCard
								key={movie._id}
								movieData={movie}
								onMovieClick={(movie) => {
									this.setSelectedMovie(movie);
								}}
							/>
						</Col>
					))
				)}
			</Row>
		);
	}
}

export default MainView;

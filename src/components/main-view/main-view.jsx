import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Button, Row, Col, Navbar, Container } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import DirectorView from '../director-view/director-view';
import ProfileView from '../profile-view/profile-view';
import MovieView from '../movie-view/movie-view';
import NavBar from '../navbar/navbar';
import GenreView from '../genre-view/genre-view';

import { connect } from 'react-redux';
import { setMovies, setUserData } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

class MainView extends React.Component {
	constructor() {
		super();
		// Initial state is set to null
		this.state = {
			// movies: [],
			// selectedMovie: null,
			user: null,
			registered: true,
			existingUser: false,
		};
	}

	componentDidMount() {
		let authToken = localStorage.getItem('token');
		if (authToken !== null) {
			this.setState({
				user: localStorage.getItem('user'),
			});
			this.getMovies(authToken);
			this.getUserData(authToken);
		}
	}

	/**
	 * Making movie data and user data axios calls from the main-view(upper-level component)
	 * then passing down as props to other views.
	 */
	getMovies(token) {
		axios
			.get('https://david-caldwell-myflix.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.props.setMovies(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getUserData(token) {
		const username = localStorage.getItem('user');
		// const username = this.state.user;
		axios
			.get(`https://david-caldwell-myflix.herokuapp.com/users/${username}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.props.setUserData({
					Username: response.data.Username,
					Password: response.data.Password,
					Email: response.data.Email,
					Birthday: response.data.Birthday,
					FavoriteMovies: response.data.FavoriteMovies,
				});
			})
			.catch((err) => console.log(err));
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null,
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
	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username,
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
		// this.getUser(authData.token);
	}

	onRegister(registered) {
		this.setState({
			registered,
		});
	}

	render() {
		let { movies, userData } = this.props;
		let { user } = this.state;
		console.log(userData);

		return (
			<Router>
				<NavBar user={user} />
				<Container style={{ maxWidth: '95%' }}>
					<Row className="main-view justify-content-md-center mt-4 pt-2">
						<Route
							exact
							path="/"
							render={() => {
								if (!user) {
									return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
								}
								if (movies.length === 0) return <div className="main-view" />;
								return <MoviesList movies={movies} />;
							}}
						/>
						<Route
							exact
							path="/register"
							render={() => {
								if (user) return <Redirect to="/" />;
								return (
									<RegistrationView
										onRegister={(registered) => this.onRegister(registered)}
									/>
								);
							}}
						/>
						<Route
							exact
							path="/movies/:movieId"
							render={({ match, history }) => {
								if (!user) {
									return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
								}
								return (
									<Col lg={10} md={10} sm={12}>
										<MovieView
											movie={movies.find((m) => m._id === match.params.movieId)}
											onBackClick={() => history.goBack()}
											user={user}
											userData={userData}
										/>
									</Col>
								);
							}}
						/>
						<Route
							exact
							path="/directors/:name"
							render={({ match, history }) => {
								if (!user) {
									return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
								}
								if (movies.length === 0) return <div className="main-view" />;
								return (
									<Col lg={10} md={10} sm={12}>
										<DirectorView
											director={
												movies.find((m) => m.Director.Name === match.params.name).Director
											}
											onBackClick={() => history.goBack()}
										/>
									</Col>
								);
							}}
						/>
						<Route
							exact
							path="/genres/:name"
							render={({ match, history }) => {
								if (!user) {
									return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
								}
								if (movies.length === 0) return <div className="main-view"></div>;
								return (
									<Col lg={10} md={10} sm={12}>
										<GenreView
											genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}
											onBackClick={() => history.goBack()}
										/>
									</Col>
								);
							}}
						/>
						<Route
							exact
							path={'/users/:username'}
							render={({ match, history }) => {
								if (!user) {
									return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
								}
								if (movies.length === 0) return <div className="main-view"></div>;
								return (
									<ProfileView
										movies={movies}
										userData={userData}
										user={user === match.params.userame}
										onLoggedOut={() => this.onLoggedOut()}
										onBackClick={() => history.goBack()}
									/>
								);
							}}
						/>
						{/* <Route exact path="" render={<ProfileView />} />  */}
					</Row>
				</Container>
			</Router>
		);
	}
}

let mapStateToProps = (state) => {
	return { movies: state.movies, userData: state.userData };
};

export default connect(mapStateToProps, { setMovies, setUserData })(MainView);

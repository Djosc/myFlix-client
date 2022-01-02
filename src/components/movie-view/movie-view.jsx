import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col, Button, Container, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MovieView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			FavoriteMovies: [],
		};
	}

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
					FavoriteMovies: response.data.FavoriteMovies,
				});
			})
			.catch((err) => console.log(err));
	}

	addMovieToFavorites(props) {
		const username = localStorage.getItem('user');
		const authToken = localStorage.getItem('token');

		axios
			.post(
				`https://david-caldwell-myflix.herokuapp.com/users/${username}/movies/${this.props.movieData._id}`,
				{},
				{
					headers: { Authorization: `Bearer ${authToken}` },
					method: 'POST',
				}
			)
			.then((response) => {
				alert('Movie Added to Favorites');
			})
			.catch((err) => console.log(err));
	}

	removeMovieFromFavorites(props) {
		const username = localStorage.getItem('user');
		const authToken = localStorage.getItem('token');

		axios
			.delete(
				`https://david-caldwell-myflix.herokuapp.com/users/${username}/movies/${this.props.movieData._id}`,
				{
					headers: { Authorization: `Bearer ${authToken}` },
					method: 'DELETE',
				}
			)
			.then((response) => {
				alert('Movie Removed from Favorites');
			})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		const { movieData, user, onBackClick } = this.props;
		console.log(this.state.FavoriteMovies);

		if (movieData.length === 0) return <div>No movies to display.</div>;

		return (
			<Container className="movie-view">
				<Row>
					<Col>
						<img
							src={movieData.ImagePath}
							crossOrigin="anonymous"
							style={{ width: '100%' }}
						/>
					</Col>
					<Col className="text-center">
						<Stack gap={4} className="row-xs-3" style={{ marginTop: '20%' }}>
							<div className="movie-title">
								<h2>{movieData.Title}</h2>
							</div>
							<div className="movie-director">
								<span className="label">Directed by:</span>
								<Link to={`/directors/${movieData.Director.Name}`}>
									<Button variant="link">{movieData.Director.Name}</Button>
								</Link>
							</div>
							<div className="movie-genre">
								<span className="label">Genre:</span>
								<Link to={`/genres/${movieData.Genre.Name}`}>
									<Button variant="link">{movieData.Genre.Name}</Button>
								</Link>
							</div>
							<div className="movie-description">
								<span className="value">{movieData.Description}</span>
							</div>
							{this.state.FavoriteMovies.includes(movieData._id) ? (
								<Button
									className="mt-4"
									variant="danger"
									size="lg"
									onClick={() => this.removeMovieFromFavorites(movieData)}
								>
									Remove from Favorites
								</Button>
							) : (
								<Button
									className="mt-4"
									variant="warning"
									size="lg"
									onClick={() => this.addMovieToFavorites(movieData)}
								>
									Add to Favorites
								</Button>
							)}
							{/* <Button
								className="mt-4"
								variant="warning"
								size="lg"
								onClick={() => this.addMovieToFavorites(movieData)}
							>
								Add to Favorites
							</Button> */}
							<Button
								className="mt-4"
								variant="primary"
								size="lg"
								onClick={() => {
									onBackClick();
								}}
							>
								Back
							</Button>
						</Stack>
					</Col>
				</Row>
			</Container>
		);
	}
}

MovieView.propTypes = {
	movieData: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired,
		}).isRequired,
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
			Birth: PropTypes.string.isRequired,
			Death: PropTypes.string,
		}).isRequired,
		ImagePath: PropTypes.string, //Maybe need to make this required
		Featured: PropTypes.bool.isRequired,
	}).isRequired,
	// user: PropTypes.bool.isRequired,
	onBackClick: PropTypes.func.isRequired,
};

export default MovieView;

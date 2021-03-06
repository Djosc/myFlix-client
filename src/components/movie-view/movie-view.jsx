import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col, Button, Container, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import { setUserData } from '../../actions/actions';

function MovieView({ movie, user, userData, onBackClick }) {
	const dispatch = useDispatch();

	const clicked = userData.FavoriteMovies.includes(movie._id) ? true : false;

	const [favorited, setFavorited] = useState(clicked);

	const addMovieToFavorites = (movie) => {
		const username = localStorage.getItem('user');
		const authToken = localStorage.getItem('token');

		axios
			.post(
				`https://david-caldwell-myflix.herokuapp.com/users/${username}/movies/${movie._id}`,
				{},
				{
					headers: { Authorization: `Bearer ${authToken}` },
					method: 'POST',
				}
			)
			.then((response) => {
				setFavorited(!favorited);
				dispatch(
					setUserData({
						Username: response.data.Username,
						Password: response.data.Password,
						Email: response.data.Email,
						Birthday: response.data.Birthday,
						FavoriteMovies: response.data.FavoriteMovies,
					})
				);
			})
			.catch((err) => console.log(err));
	};

	const removeMovieFromFavorites = (movie) => {
		const username = localStorage.getItem('user');
		const authToken = localStorage.getItem('token');

		axios
			.delete(
				`https://david-caldwell-myflix.herokuapp.com/users/${username}/movies/${movie._id}`,
				{
					headers: { Authorization: `Bearer ${authToken}` },
					method: 'DELETE',
				}
			)
			.then((response) => {
				setFavorited(!favorited);
				console.log(response.data);
				dispatch(
					setUserData({
						Username: response.data.Username,
						Password: response.data.Password,
						Email: response.data.Email,
						Birthday: response.data.Birthday,
						FavoriteMovies: response.data.FavoriteMovies,
					})
				);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	if (movie.length === 0) return <div>No movies to display.</div>;

	return (
		<Container className="movie-view">
			<Row className="justify-content-center">
				<Col xs={12} sm={10} md={10} lg={6}>
					<img src={movie.ImagePath} crossOrigin="anonymous" style={{ width: '100%' }} />
				</Col>
				<Col xs={10} sm={8} md={10} lg={6} className="text-center">
					<Stack gap={4} className="row-xs-3" style={{ marginTop: '20%' }}>
						<div className="movie-title">
							<h2>{movie.Title}</h2>
						</div>
						<div className="movie-director">
							<span className="label">Directed by:</span>
							<Link to={`/directors/${movie.Director.Name}`}>
								<Button variant="link">{movie.Director.Name}</Button>
							</Link>
						</div>
						<div className="movie-genre">
							<span className="label">Genre:</span>
							<Link to={`/genres/${movie.Genre.Name}`}>
								<Button variant="link">{movie.Genre.Name}</Button>
							</Link>
						</div>
						<div className="movie-description">
							<span className="value">{movie.Description}</span>
						</div>
						{favorited ? (
							<Button
								className="mt-4"
								variant="danger"
								size="lg"
								onClick={() => removeMovieFromFavorites(movie)}
							>
								Remove from Favorites
							</Button>
						) : (
							<Button
								className="mt-4"
								variant="warning"
								size="lg"
								onClick={() => addMovieToFavorites(movie)}
							>
								Add to Favorites
							</Button>
						)}
						<Button
							className="mt-4 mb-4"
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

MovieView.propTypes = {
	movie: PropTypes.shape({
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
	onBackClick: PropTypes.func.isRequired,
	setUserData: PropTypes.func,
};

let mapStateToProps = (state) => {
	// console.log(state.userData);
	return { userData: state.userData };
};

export default connect(mapStateToProps, { setUserData })(MovieView);

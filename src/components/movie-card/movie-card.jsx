import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;

		return (
			<Link to={`/movies/${movie._id}`} className="movie__card-link">
				<Card className="movie__movie-card mb-4">
					<Card.Img
						variant="top"
						className="movie__card-image"
						style={{ minHeight: '475px', maxHeight: '475px' }}
						src={movie.ImagePath}
						crossOrigin="anonymous"
					/>
					<Card.Body className="text-center movie__card-body">
						<Card.Title className="movie__card-title">{movie.Title}</Card.Title>
						<Button variant="primary" className="mt-3 movie__card-button">
							More Info
						</Button>
					</Card.Body>
				</Card>
			</Link>
		);
	}
}

MovieCard.propTypes = {
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
};

export default MovieCard;

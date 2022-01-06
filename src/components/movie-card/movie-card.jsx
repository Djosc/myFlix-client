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
			<Card>
				<Card.Img variant="top" src={movie.ImagePath} crossOrigin="anonymous" />
				<Card.Body>
					<Card.Title>{movie.Title}</Card.Title>
					<Link to={`/movies/${movie._id}`}>
						<Button variant="primary" className="mt-3">
							More Info
						</Button>
					</Link>
				</Card.Body>
			</Card>
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

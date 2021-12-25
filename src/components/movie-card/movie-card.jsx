import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

class MovieCard extends React.Component {
	render() {
		const { movieData, onMovieClick } = this.props;

		return (
			<Card>
				<Card.Img variant="top" src={movieData.ImagePath} />
				<Card.Body>
					<Card.Title>{movieData.Title}</Card.Title>
					<Card.Text>{movieData.Description}</Card.Text>
					<Button onClick={() => onMovieClick(movie)} variant="link">
						More Info
					</Button>
				</Card.Body>
			</Card>
		);
	}
}

MovieCard.propTypes = {
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
	onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;

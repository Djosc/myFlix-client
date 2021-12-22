import React from 'react';
import PropTypes from 'prop-types';

class MovieCard extends React.Component {
	render() {
		const { movieData, onMovieClick } = this.props;

		return (
			<div
				className="movie-card"
				onClick={() => {
					onMovieClick(movieData);
				}}
			>
				{movieData.Title}
			</div>
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

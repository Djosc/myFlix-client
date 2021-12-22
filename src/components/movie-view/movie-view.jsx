import React from 'react';
import PropTypes from 'prop-types';

class MovieView extends React.Component {
	render() {
		const { movieData, onBackClick } = this.props;

		if (movieData.length === 0) return <div>No movies to display.</div>;

		return (
			<div className="movie-view">
				<div className="movie-poster">
					<img src={movieData.ImagePath} />
				</div>
				<div className="movie-title">
					<span className="label">Title: </span>
					<span className="value">{movieData.Title}</span>
				</div>
				<div className="movie-description">
					<span className="label">Description: </span>
					<span className="value">{movieData.Description}</span>
				</div>
				<div className="movie-director">
					<span className="label">Director: </span>
					<span className="value">{movieData.Director.Name}</span>
				</div>
				<button
					onClick={() => {
						onBackClick(null);
					}}
				>
					Back
				</button>
			</div>
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
	onBackClick: PropTypes.func.isRequired,
};

export default MovieView;

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class GenreView extends React.Component {
	render() {
		const { genre, onBackClick } = this.props;
		return (
			<div className="text-center my-3">
				<h2>{genre.Name}</h2>
				<div className="genre-description my-4">
					<span>{genre.Description}</span>
				</div>
				<Button variant="primary" size="lg" onClick={onBackClick}>
					Back
				</Button>
			</div>
		);
	}
}

export default GenreView;

GenreView.propTypes = {
	genre: PropTypes.string,
	onBackClick: PropTypes.func,
};

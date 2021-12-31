import React from 'react';
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

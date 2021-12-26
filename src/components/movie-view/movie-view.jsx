import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Container, Stack } from 'react-bootstrap';

class MovieView extends React.Component {
	render() {
		const { movieData, onBackClick } = this.props;

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
					<Col>
						<Stack gap={4} className="row-xs-3" style={{ marginTop: '20%' }}>
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
							<Button
								className=""
								variant="primary"
								onClick={() => {
									onBackClick(null);
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
	onBackClick: PropTypes.func.isRequired,
};

export default MovieView;

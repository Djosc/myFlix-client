import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Container, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
						<Stack gap={4} className="row-xs-3 text-center" style={{ marginTop: '20%' }}>
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
							<Button
								className=""
								variant="primary"
								onClick={() => {
									this.props.onBackClick();
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

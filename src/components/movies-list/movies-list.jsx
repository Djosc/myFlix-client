import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import MovieCard from '../movie-card/movie-card';

const mapStateToProps = (state) => {
	const { visibilityFilter } = state;
	return { visibilityFilter };
};

function MoviesList(props) {
	const { movies, visibilityFilter } = props;
	let filteredMovies = movies;

	if (visibilityFilter !== '') {
		filteredMovies = movies
			.filter((m) => m.Title.toLowerCase())
			.includes(visibilityFilter.toLowerCase());
	}

	if (!movies) return <div className="main-view" />;

	return filteredMovies.map((m) => (
		<Col lg={10} md={10} sm={12} key={m._id}>
			<MovieCard movie={m} />
		</Col>
	));
}

// MoviesList.propTypes = {

// }

export default connect(mapStateToProps)(MoviesList);

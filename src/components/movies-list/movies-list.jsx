import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import MovieCard from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = (state) => {
	const { visibilityFilter } = state;
	return { visibilityFilter };
};

function MoviesList(props) {
	const { movies, visibilityFilter } = props;
	let filteredMovies = movies;

	console.log(filteredMovies);

	if (visibilityFilter !== '') {
		filteredMovies = movies.filter((m) =>
			m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
		);
	}

	console.log(filteredMovies);

	if (!movies) return <div className="main-view" />;

	return (
		<>
			<Col md={12} className="mb-4">
				<VisibilityFilterInput visibilityFilter={visibilityFilter} />
			</Col>
			{filteredMovies.map((m) => (
				<Col lg={3} md={4} sm={6} key={m._id}>
					<MovieCard movie={m} />
				</Col>
			))}
		</>
	);
}

// MoviesList.propTypes = {

// }

export default connect(mapStateToProps)(MoviesList);

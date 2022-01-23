import React, { useState } from 'react';
import { Container, Col, Row, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setUserData, setMovies } from '../../actions/actions';
import './user-info.scss';

function UserInfo({ movies, userName, email, birthday, userData }) {
	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title className="text-center">Account Details</Card.Title>
					<Card.Text>Username: {userName}</Card.Text>
					<Card.Text>Email: {email}</Card.Text>
					<Card.Text>Birthday: {moment.utc(birthday).format('MM-DD-YYYY')}</Card.Text>
				</Card.Body>
			</Card>
			{/* <Container>
				<Row> */}
			<Card>
				<Card.Title className="text-center">Favorite Movies</Card.Title>
				{/* <ListGroup horizontal className="fav-movies text-center"> */}
				<div className="">
					{userData.FavoriteMovies.map((favId, index) => {
						let movie = movies.find((m) => m._id === favId);
						return (
							<Link key={index} to={`/movies/${favId}`}>
								<img
									key={index}
									src={movie.ImagePath}
									alt="favorite movies image"
									crossOrigin="anonymous"
									className="fav-movies__image"
									style={{
										height: '300px',
										width: '33.3%',
									}}
								/>
							</Link>
						);
					})}
				</div>
				{/* </ListGroup> */}
			</Card>
			{/* </Row>
			</Container> */}
		</>
	);
}

let matchStateToProps = (state) => {
	const { userData, movies } = state;
	return { userData, movies };
};

export default connect(matchStateToProps, { setUserData, setMovies })(UserInfo);

UserInfo.propTypes = {
	movies: PropTypes.array,
	userName: PropTypes.string,
	email: PropTypes.string,
	birthday: PropTypes.string,
	userData: PropTypes.object,
};

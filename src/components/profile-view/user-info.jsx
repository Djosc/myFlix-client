import React, { useState } from 'react';
import { Container, Col, Row, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { connect } from 'react-redux';
import { setUserData } from '../../actions/actions';

function UserInfo({ movies, userData, userName, email, birthday }) {
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
			<Card>
				<Card.Body>
					<Card.Header className="text-center">Favorite Movies</Card.Header>
					<ListGroup className="text-center">
						{console.log(userData.FavoriteMovies)}
						{userData.FavoriteMovies.map((favId, index) => {
							let movie = movies.find((m) => m._id === favId);
							return (
								<Link to={`/movies/${favId}`}>
									{' '}
									<ListGroup.Item key={index}>{movie.Title}</ListGroup.Item>{' '}
								</Link>
							);
						})}
					</ListGroup>
				</Card.Body>
			</Card>
		</>
	);
}

let matchStateToProps = (state) => {
	const { userData } = state;
	return { userData };
};

export default connect(matchStateToProps, { setUserData })(UserInfo);

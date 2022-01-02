import React from 'react';
import { Container, Col, Row, Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

function UserInfo({ movies, userName, email, birthday, favoriteMovies }) {
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
						{favoriteMovies.map((favId) => {
							let movie = movies.find((m) => m._id === favId);
							console.log(movie);
							return (
								<Link to={`/movies/${favId}`}>
									{' '}
									<ListGroup.Item key={favId}>{movie.Title}</ListGroup.Item>{' '}
								</Link>
							);
						})}
					</ListGroup>
				</Card.Body>
			</Card>
		</>
	);
}

export default UserInfo;

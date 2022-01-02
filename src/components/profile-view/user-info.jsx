import React from 'react';
import { Container, Col, Row, Card, ListGroup } from 'react-bootstrap';

function UserInfo({ movie, userName, email, favoriteMovies }) {
	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title className="text-center">Account Details</Card.Title>
					<Card.Text>Username: {userName}</Card.Text>
					<Card.Text>Email: {email}</Card.Text>
				</Card.Body>
			</Card>
			<Card>
				<Card.Body>
					<Card.Header className="text-center">Favorite Movies</Card.Header>
					<ListGroup>
						{favoriteMovies.map((movie) => (
							<ListGroup.Item>{movie.Title}</ListGroup.Item>
						))}
					</ListGroup>
				</Card.Body>
			</Card>
		</>
	);
}

export default UserInfo;

import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class DirectorView extends React.Component {
	render() {
		const { director, onBackClick } = this.props;
		var dateBornSplit = director.Birth.split('T');
		var dateBornTrim = dateBornSplit[0];

		if (director.Death !== null) {
			var dateDeathSplit = director.Death.split('T');
			var dateDeathTrim = dateDeathSplit[0];
		}

		return (
			<div className="text-center my-2">
				<h2>{director.Name}</h2>
				<div className="director-bio"></div>
				<div className="director-birth">
					<span>
						Born: {dateBornTrim} -{' '}
						{director.Death !== null ? `${dateDeathTrim}` : 'Present'}
					</span>
				</div>
				<div className="director-description my-4">
					<span>{director.Bio}</span>
				</div>
				<Button variant="primary" size="lg" onClick={onBackClick}>
					Back
				</Button>
			</div>
		);
	}
}

export default DirectorView;

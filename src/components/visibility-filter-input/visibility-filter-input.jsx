import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
	return (
		<Form.Control
			onChange={(e) => props.setFilter(e.target.value)}
			value={props.visibilityFilter}
			placeholder="Search..."
		/>
	);
}

export default connect(null, { setFilter })(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
	visibilityFilter: PropTypes.string,
	setFilter: PropTypes.func,
};

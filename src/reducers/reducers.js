import { combineReducers } from 'redux';

import {
	SET_USER,
	UPDATE_USER,
	SET_FILTER,
	SET_MOVIES,
	SET_USERDATA,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
	switch (action.type) {
		case SET_FILTER:
			return action.value;
		default:
			return state;
	}
}

function movies(state = [], action) {
	switch (action.type) {
		case SET_MOVIES:
			return action.value;
		default:
			return state;
	}
}

function user(state = '', action) {
	switch (action.type) {
		case SET_USER:
			return action.value;
		case UPDATE_USER:
			return action.value;
		default:
			return state;
	}
}

function userData(state = [], action) {
	switch (action.type) {
		case SET_USERDATA:
			console.log('Set userData action triggered: ', action.value);
			return action.value;
		default:
			// console.log('Set userData action default triggered: ', state);
			return state;
	}
}

const moviesApp = combineReducers({
	visibilityFilter,
	movies,
	user,
	userData,
});

export default moviesApp;

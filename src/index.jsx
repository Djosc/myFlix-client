import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import NavBar from './components/navbar/navbar';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Create central store for the entire app to access
const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class MyFlixApplication extends React.Component {
	render() {
		return (
			<>
				<Provider store={store}>
					<Container fluid="true">
						<MainView />
					</Container>
				</Provider>
			</>
		);
	}
}

// Finds the root of the app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render the app in the root DOM element
ReactDom.render(React.createElement(MyFlixApplication), container);
// ReactDom.render(<MyFlixApplication />, container);

import React from 'react';
import App from 'containers/App';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux/configureStore';
import createBrowserHistory from 'history/createBrowserHistory';
import '../../../src/global.css';

const { store } = configureStore();
const history = createBrowserHistory();

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

export default Root;

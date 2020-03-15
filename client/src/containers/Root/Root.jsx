import React from 'react';
import App from 'containers/App';
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from 'redux/configureStore';
import createBrowserHistory from 'history/createBrowserHistory';
import '../../../src/global.css'

const { store, persistor } = configureStore();
const history = createBrowserHistory();

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
)


export default Root
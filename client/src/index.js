import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'containers/Root';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.register();

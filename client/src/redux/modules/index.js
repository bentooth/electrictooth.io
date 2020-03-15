import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender'

import blog from './blog'
import web3 from './web3'
import playlist from './playlist'

const modules = combineReducers({
  blog,
  web3,
  playlist,
  pender
});

export default modules;
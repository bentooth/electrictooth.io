import { createStore, applyMiddleware, compose } from 'redux';
import penderMiddleware from 'redux-pender';
import { logger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import modules from './modules';

const composeEnhancers = process.browser
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

export default function configureStore() {
  const persistConfig = {
    storage,
    key: 'electric-tooth',
    // REDUCERS TO PERSIST
    whitelist: [''],
  };

  const persistedReducer = persistReducer(persistConfig, modules);

  //apply middleware, penderMiddleware
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(penderMiddleware(), logger)),
  );
  const persistor = persistStore(store);

  return { store, persistor };
}

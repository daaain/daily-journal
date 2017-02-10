import { compose, applyMiddleware } from "redux"
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { isClient } from "./helpers/env"
import { database } from "./helpers/pouch"
import { persistentStore } from "redux-pouchdb-plus"
import createStore from "phenomic/lib/redux/createStore"

import rootReducer from './reducers/index';

const loggerMiddleware = createLogger();

const applyMiddlewares = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
);

const createStoreWithMiddleware = compose(
  applyMiddlewares,
  persistentStore({db: database})
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer,
  { ...(isClient && window.__INITIAL_STATE__) },
)

if (isClient && module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers/index', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store

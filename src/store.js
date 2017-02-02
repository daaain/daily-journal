import { compose, combineReducers, applyMiddleware } from "redux"
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import PouchDB from "pouchdb"
import { persistentStore } from "redux-pouchdb"
import createStore from "phenomic/lib/redux/createStore"
// eslint-disable-next-line import/no-namespace
import * as phenomicReducers from "phenomic/lib/redux/modules"
import journal from "./journalReducer"

const db = new PouchDB('journal');
const loggerMiddleware = createLogger();

const applyMiddlewares = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
);

const createStoreWithMiddleware = compose(
  applyMiddlewares,
  persistentStore(db)
)(createStore);

const store = createStoreWithMiddleware(
  combineReducers({...phenomicReducers, journal}),
  { ...(typeof window !== "undefined") && window.__INITIAL_STATE__ },
)

export default store

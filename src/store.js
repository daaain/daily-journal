import { combineReducers } from "redux"
import PouchDB from "pouchdb"
import { persistentStore } from "redux-pouchdb"
import createStore from "phenomic/lib/redux/createStore"
// eslint-disable-next-line import/no-namespace
import * as phenomicReducers from "phenomic/lib/redux/modules"

const db = new PouchDB('journal');

const store = createStore(
  combineReducers({...phenomicReducers, persistentStore: persistentStore(db)}),
  { ...(typeof window !== "undefined") && window.__INITIAL_STATE__ },
)

export default store

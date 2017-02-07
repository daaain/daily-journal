import { combineReducers } from "redux"

// eslint-disable-next-line import/no-namespace
import * as phenomicReducers from "phenomic/lib/redux/modules"
import journal from "./journal"

export default combineReducers({
  ...phenomicReducers,
  journal
})

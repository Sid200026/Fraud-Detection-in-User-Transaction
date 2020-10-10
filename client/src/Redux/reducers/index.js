import { combineReducers } from "redux";
import expectationReducer from "./expectation";
import transactionReducer from "./transaction";

export default combineReducers({ expectationReducer, transactionReducer });

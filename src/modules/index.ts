import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import counter from "./counter";
import todo from "./todoTypesafeActions";

const rootReducer = combineReducers({ counter, todo });

export function* rootSaga() {
  yield all([]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

// 루트 리듀서 - 리듀서 연결
import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";
import sample, { sampleSaga } from "./sample";
import loading from "./loading";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export function* rootSaga() {
  // all 함수는 여러 사가(제너레이터 함수)를 합쳐 주는 역할을 함
  yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;

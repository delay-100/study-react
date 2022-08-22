// 루트 리듀서 - 리듀서 연결
import { combineReducers } from "redux";
import counter from "./counter";
import sample from "./sample";

const rootReducer = combineReducers({
  counter,
  sample,
});

export default rootReducer;

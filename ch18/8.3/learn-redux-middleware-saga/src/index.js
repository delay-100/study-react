import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import rootReducer, { rootSaga } from "./modules";
// import loggerMiddleware from "./lib/loggerMiddleware";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const root = ReactDOM.createRoot(document.getElementById("root"));
// 기존 store 코드
// const store = createStore(rootReducer, applyMiddleware(loggerMiddleware)); // 스토어 생성, applyMiddleware는 src/lib/loggerMiddleware.js에서 만든 미들웨어를 적용해준 것
// redux-logger을 추가한 코드
const store = createStore(
  rootReducer,
  applyMiddleware(logger, ReduxThunk, sagaMiddleware) // composeWithDevTools 함수를 리덕스 미들웨어와 함께 사용 시 그냥 applyMiddleware부분을 감싸주면 됨
);
sagaMiddleware.run(rootSaga);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*Provider로 리액트 프로젝트에 리덕스를 적용함 */}
      <App />
    </Provider>
    ,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

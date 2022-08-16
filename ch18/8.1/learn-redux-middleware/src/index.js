import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./modules";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(rootReducer); // 스토어 생성

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

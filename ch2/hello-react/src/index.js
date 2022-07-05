import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render: 컴포넌트를 페이지에 렌더링하는 역할
// react-dom 모듈을 불러와 사용할 수 있음 
const root = ReactDOM.createRoot(document.getElementById('root')); // id가 root인 요소 안에 렌더링 하도록 설정, 'root'는 public/index.html 파일

// 페이지에 렌더링할 내용을 JSX 형태로 작성
root.render(
  // React.StrictMode: 리액트 프로젝트에서 리액트의 레거시 기능을 사용하지 못하게 하는 기능
  // 문자열 ref, componentWillMount 등 나중에 완전히 사라질 옛날 기능을 사용했을 때 경고 출력
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

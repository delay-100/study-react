// 이 아래부터는
// 2. React.lazy와 Suspense 사용하기, 3. Loadable Components를 통한 코드 스플리팅
// 2-1. React.lazy: 컴포넌트를 렌더링하는 시점에서 비동기적으로 로딩할 수 있게 해 주는 유틸 함수
// 2-2. Suspense: 리액트 내장 컴포넌트로서 코드 스플링된 컴포넌트를 로딩하도록 발동시킬 수 있고, 로딩이 끝나지 않았을 때 보여줄 UI를 설정할 수 있음
import { useState, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import React from "react";
import loadable from "@loadable/component";

// 2-1. React.lazy
// const SplitMe = React.lazy(() => import("./SplitMe")); // React.lazy: 컴포넌트를 렌더링하는 시점에서 비동기적으로 로딩할 수 있게 해 주는 유틸 함수
// 3. Loadable Components
const SplitMe = loadable(() => import("./SplitMe"), {
  fallback: <div>loading...</div>, // 로딩 중에 다른 UI를 보여주고 싶은 경우 loadable을 사용하는 부분을 fallback 설정
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };

  const onMouseOver = () => {
    SplitMe.preload(); // preload: 컴포넌트를 미리 불러옴
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>
          Hello React!
        </p>
        {/* 2-2. Suspense: 리액트 내장 컴포넌트, 코드 스플리팅 된 코드 발동, 로딩이 끝나지 않았을 때 보여줄 UI 설정 */}
        {/* <Suspense fallback={<div>loading...</div>}> */}
        {/* 로딩 안 끝났을 때 "loading..." 표시 됨 */}
        {/* onClick: 클릭 했을 때 렌더링됨, onMouseOver: 마우스 커서를 Hello React!위에 올리기만 해도 로딩이 시작됨 */}
        {visible && <SplitMe />}
        {/* </Suspense> */}
      </header>
    </div>
  );
}

export default App;

// // 이 아래부터는
// // 1. state를 사용한 코드 스플리팅

// import { Component } from "react";
// import logo from "./logo.svg";
// import "./App.css";

// // App 컴포넌트를 클래스형 컴포넌트로 전환
// class App extends Component {
//   state = {
//     SplitMe: null,
//   };
//   handleClick = async () => {
//     // handleClick 메서드: SplitMe 컴포넌트를 불러와 state에 넣음
//     const loadedModule = await import("./SplitMe");
//     this.setState({
//       SplitMe: loadedModule.default,
//     });
//   };
//   render() {
//     const { SplitMe } = this.state;
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p onClick={this.handleClick}>Hello React!</p>
//           {SplitMe && <SplitMe />}
//           {/* state 안에 있는 SplitMe 가 유효하다면 SplitMe 컴포넌트를 렌더링 해줘야 함 */}
//         </header>
//       </div>
//     );
//   }
// }

// export default App;

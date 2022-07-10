// useState를 사용한 함수 컴포넌트
import Say from './Say';

const App = () => {
  return <Say />;
};

export default App;

// // state를 사용한 클래스형 컴포넌트
// import Counter from './Counter';

// const App = () => {
//   return <Counter />;
// };

// export default App;

// // pros 사용한 Component 생성
// import MyComponent from "./MyComponent";

// const App = () => {
//   // return <MyComponent name="React" />; // src/MyComponent.js의 props.name 값
//   // return <MyComponent>리액트</MyComponent>; // src/MyComponent.js의 props.children 값
//   // return <MyComponent name="React" >리액트</MyComponent>;
//   return (
//     <MyComponent name="React" favoriteNumber={1}>
//       리액트
//     </MyComponent>
//   );
// };

// export default App;

// // Component 생성
// import MyComponent from "./MyComponent"; // 모듈 불러오기

// const App = () => {
//   return <MyComponent />;
// };

// export default App;

// // 클래스형 컴포넌트
// import { Component } from "react";

// class App extends Component {
//   render() {
//     const name = "react";
//     return <div className="react">{name}</div>;
//   }
// }

// export default App;

// // 함수 컴포넌트
// import './App.css';

// class App() {
//     const name = "리액트";
//     return <div className="react">{name}</div>;
//   }
// }

// export default App;

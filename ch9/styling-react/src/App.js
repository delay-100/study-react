import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import SassComponent from "./SassComponent";

class App extends Component {
  render() {
    return (
      <div>
        <SassComponent />
      </div>
    );
  }
}
export default App;

// // 이 아래 주석은 1. CSS 관련임
// function App() {
//   return (
// <div className="App">
//   {/* <header className="App-header"> */}
//   <header>
//     {/* <img src={logo} className="App-logo" alt="logo" /> */}
//     <img src={logo} className="logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
//   );
// }
// export default App;

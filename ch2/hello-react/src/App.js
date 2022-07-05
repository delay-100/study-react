import logo from './logo.svg';
import './App.css';

// 함수 컴포넌트: function 키워드를 사용하여 만들어진 컴포넌트
function App() { // App이라는 함수 컴포넌트 생성
  return ( // 이 아래의 코드는 JSX 코드임(html, 문자열 템플릿이 아님)
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

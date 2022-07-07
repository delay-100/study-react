// import logo from './logo.svg';
import "./App.css";
// import { Fragment } from 'react';

// 함수 컴포넌트: function 키워드를 사용하여 만들어진 컴포넌트
function App() {
  // App이라는 함수 컴포넌트 생성

  // 주석
  const name = "리액트";
  return (
    <>
      {/* 주석은 이렇게 작성합니다. */}
      <div
        className="react" // 시작 태그를 여러 줄로 작성하게 된다면 여기에 주석을 작성할 수 있습니다.
      >
        {name}
      </div>
      // 하지만 이런 주석이나 
      /* 이런 주석은 페이지에 그대로 나타나게 됩니다. */
      <input />
    </>
  );

  // // css 파일 사용
  // const name = '리액트';
  // return <div className="react">{name}</div>; // class=""로 작성해도 되지만, 경고 문구가 발생함. JSX에서는 className으로 사용

  // // 인라인 스타일링
  // const name = '리액트';

  // // style 미리 선언 방식
  // const style = {
  //   backgroundColor: 'black',
  //   color: 'aqua',
  //   fontSize: '48px',
  //   fontWeight: 'bold',
  //   padding: 16
  // };
  // return <div style={style}>{name}</div>;

  // // // style 자체적으로 선언 방식
  // // return <div style={{
  // //   backgroundColor: 'black',
  // //   color: 'aqua',
  // //   fontSize: '48px',
  // //   fontWeight: 'bold',
  // //   padding: 16
  // // }}>{name}</div>;

  // // OR 연산자(||)
  // const name = undefined;

  // // return name; // 불가능 - undefined를 호출하는 것은 오류 발생
  // // return name || '값이 undefined입니다.'; // 가능
  // // return <div>{name}</div> // 가능 - JSX 내부에서 undefined를 렌더링
  // return <div>{name || '리액트'}</div>; // 가능 - name값이 undefined일 때 보여주고 싶은 문구가 있는 경우

  // // && 연산자로 조건부 렌더링을 할 수 있는 이유?
  // const number =0;
  // return number && <div>내용</div>

  // // AND 연산자(&&)
  // const name = '뤼왝트';

  // return <div>{name === '리액트' && <h1>리액트입니다.</h1>}</div>
  // // // 아래의 코드와 같음
  // // return <div>{name === '리액트' ? <h1>리액트입니다.</h1> : null}</div> // null 렌더링 시 아무것도 보여주지 않음

  // // 조건부 연산자(IF)
  // const name = '리액트';
  // return (
  //   <div>
  //     { name === '리액트' ? (
  //       <h1>리액트입니다.</h1>
  //     ) : (
  //       <h2>리액트가 아닙니다.</h2>
  //     )
  //   }
  //   </div>
  // );

  // // JSX 예시4
  // const name = '리액트';
  // return (  // 이 아래의 코드는 JSX 코드임(html, 문자열 템플릿이 아님)
  //   // div를 적지 않으면 에러 발생 -> Virtual DOM에서 컴포넌트 변화를 감지해 낼 때 효율적으로 비교할 수 있도록 컴포너느 내부는 하나의 DOM 트리 구조로 이루어져야 함
  //   // div를 적고 싶지 않으면 Fragment 기능을 사용하면 됨 (= <> </>)
  //   // <div> 또는 <Fragment>
  //     <>
  //       <h1>{name} 안녕!</h1>
  //       <h2>잘 작동하니?</h2>
  //     </>
  //   // </div> 또는 </Fragment>
  // );

  // // JSX 예시 2
  // return (
  // <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

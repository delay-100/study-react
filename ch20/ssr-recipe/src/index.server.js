// 엔트리 파일: 서버에서 제일 처음 실행됨
import ReactDOMServer from "react-dom/server";

const html = ReactDOMServer.renderToString(
  //ReactDOMServer 中 renderToString 함수: 서버에서 리액트 컴포넌트 렌더링 시 사용하는 함수 => JSX를 넣어 호출 시 결과를 "문자열"로 반환
  <div>Hello Server Side Rendering!</div>
);

console.log(html);

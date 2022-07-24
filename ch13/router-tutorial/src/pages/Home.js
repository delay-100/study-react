// Home 페이지 컴포넌트: 사용자가 웹 사이트에 들어왔을 때 가장 먼저 보여지게 됨
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
      <ul>
        <li>
          <Link to="/about">소개</Link>
          {/* 리액트 라우터를 사용하는 프로젝트에서는 a태그 대신 Link를 대신 사용, Link역시 a를 사용하긴 하지만 페이지를 새로 불러오는 것을 막고 History API를 통해 브라우저 주소의 경로만 바꾸는 기능이 내장되어 있음 */}
        </li>
        <li>
          <Link to="/profiles/delay100">delay100의 프로필</Link>
        </li>
        <li>
          <Link to="/profiles/gildong">gildong의 프로필</Link>
        </li>
        <li>
          <Link to="/profiles/temp">존재하지 않는 프로필</Link>
        </li>
        <li>
          <Link to="/articles">게시글 목록</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;

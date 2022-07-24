// import { Link } from "react-router-dom"; // 중첩된 라우트 사용 전 기존 방식 예시
import { Link, Outlet } from "react-router-dom"; // 중첩된 라우트 사용 예시

const Articles = () => {
  return (
    <div>
      <Outlet />
      {/* Outlet 컴포넌트가 사용된 자리에 중첩된 라우트가 보여지게 됩니다. */}
      <ul>
        <li>
          <Link to="/articles/1">게시글 1</Link>
        </li>
        <li>
          <Link to="/articles/2">게시글 2</Link>
        </li>
        <li>
          <Link to="/articles/3">게시글 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default Articles;

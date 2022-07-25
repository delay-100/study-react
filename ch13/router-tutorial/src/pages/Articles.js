// import { Link } from "react-router-dom"; // 중첩된 라우트 사용 전 기존 방식 예시
// import { Link, Outlet } from "react-router-dom"; // 중첩된 라우트 사용 예시
import { NavLink, Outlet } from "react-router-dom"; // NavLink 컴포넌트

const Articles = () => {
  const activateStyle = {
    color: "green",
    fontSize: 21,
  };
  return (
    <div>
      <Outlet />
      {/* Outlet 컴포넌트가 사용된 자리에 중첩된 라우트가 보여지게 됩니다. */}
      <ul>
        <li>
          {/*
          <Link to="/articles/1">게시글 1</Link>
        */}
          <NavLink
            to="/articles/1"
            style={({ isActivate }) => (isActivate ? activateStyle : undefined)}
          >
            게시글 1
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/articles/2"
            style={({ isActivate }) => (isActivate ? activateStyle : undefined)}
          >
            게시글 2
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/articles/3"
            style={({ isActivate }) => (isActivate ? activateStyle : undefined)}
          >
            게시글 3
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Articles;

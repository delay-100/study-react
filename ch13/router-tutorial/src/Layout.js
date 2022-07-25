// 공통 레이아웃을 위한 Layout 컴포넌트
import { Outlet, useNavigate } from "react-router-dom";
const Layout = () => {
  const navigate = useNavigate();

  const goBack = () => {
    // 이전 페이지로 이동
    navigate(-1); // navigate(-1)을 하면 뒤로 한번 감, 파라미터에 -2를 넣으면 뒤로 두 번감, 1을 넣으면 앞으로 한 번가는데, 뒤로가기를 한 번 한 상태여야 함
  };

  const goArticles = () => {
    // articles 경로로 이동
    // navigate("/articles");

    navigate("/articles", { replace: true }); // replace 옵션: 페이지를 이동할 때 현재 페이지를 페이지 기록에 남기지 않음
  };

  return (
    <div>
      <header style={{ background: "lightgray", padding: 16, fontSize: 24 }}>
        <button onClick={goBack}>뒤로가기</button>
        <button onClick={goArticles}>게시글 목록</button>
      </header>
      <main>
        <Outlet />
        {/* 각 페이지 컴포넌트가 보여져야 하는 부분에 Outlet 컴포넌트를 사용*/}
      </main>
    </div>
  );
};

export default Layout;

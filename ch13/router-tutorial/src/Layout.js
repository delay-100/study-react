// 공통 레이아웃을 위한 Layout 컴포넌트
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <header style={{ background: "lightgray", padding: 16, fontSize: 24 }}>
        Header
      </header>
      <main>
        <Outlet />
        {/* 각 페이지 컴포넌트가 보여져야 하는 부분에 Outlet 컴포넌트를 사용*/}
      </main>
    </div>
  );
};

export default Layout;

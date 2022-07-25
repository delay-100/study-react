import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import About from "./pages/About";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Home from "./pages/Home";

import Login from "./pages/Login";
import MyPage from "./pages/MyPage";

import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route index element={<Home />} /> {/* index props 적용*/}
        <Route path="/about" element={<About />} />
        <Route path="/profiles/:username" element={<Profile />} />
      </Route>
      <Route path="/articles" element={<Articles />}>
        <Route path=":id" element={<Article />} />
      </Route>
      {/* 중첩된 라우트 사용 전 기존 방식 예시 */}
      {/* <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<Article />} /> */}

      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />

      <Route path="*" element={<NotFound />} />
      {/* *는 wildcard 문자: 아무 텍스트나 매칭한다는 뜻, 이 라우트 엘리먼트의 상단에 위치하는 라우트들의 규칙을 모두 확인하고, 일치하는 라우트가 없다면 이 라우트가 화면에 나타나게 됨*/}
    </Routes>
  );
};

export default App;

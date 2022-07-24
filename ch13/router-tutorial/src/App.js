import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import About from "./pages/About";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Home from "./pages/Home";
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
    </Routes>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import RedPage from "./pages/RedPage";
import BluePage from "./pages/BluePage";

const App = () => {
  return (
    <div>
      <Menu />
      <hr />
      <Routes>
        <Route path="/red" element={<RedPage />} />
        <Route path="/blue" element={<BluePage />} />
        {/* 책에는 아래와 같이 적혀있지만 react v6부터는 위와 같이 써야 에러가 나지 않는다.. 추가로 <Routes></Routes>도 적어줘야함! */}
        {/* <Route path="/blue" component={BluePage} /> */}
      </Routes>
    </div>
  );
};

export default App;

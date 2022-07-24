// About 페이지 컴포넌트: 웹 사이트를 소개
// import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const About = () => {
  //   const location = useLocation(); // useLocation이라는 Hook 사용: 이 Hook은 location 객체를 반환하는데, 현재 사용자가 보고 있는 페이지의 정보를 지니고 있음
  const [searchParams, setSearchParams] = useSearchParams(); // useSearchParams이라는 Hook 사용: 배열 타입의 값을 반환하는데, 이 객체는 현재 사용자가 보고 있는 페이지의 정보를 가지고 있음

  // useSearchParams의 첫 번째 원소: 쿼리파라미터를 조회하거나 수정하는 메서드들이 담긴 객체를 반환함
  const detail = searchParams.get("detail"); // get 메서드: 특정 쿼리파라미터를 조회
  const mode = searchParams.get("mode");

  const onToggleDetail = () => {
    setSearchParams({ mode, detail: detail === "true" ? false : true }); // 쿼리파라미터를 조회할 때는 무조건 문자열 타입이라는 점!!! true 또는 false 값을 넣는다면 값을 비교할 때 꼭 'true'와 같이 값을 감싸주어야 함
  };

  const onIncreaseMode = () => {
    const nextMode = mode === null ? 1 : parseInt(mode) + 1; // 쿼리파라미터를 조회할 때는 무조건 문자열 타입이라는 점!!! 숫자를 다룬다면 parseInt를 이용해야 함
    setSearchParams({ mode: nextMode, detail });
  };

  return (
    <div>
      <h1>소개</h1>
      <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>
      {/* <p>쿼리스트링: {location.search}</p> */}
      {/* 쿼리스트링은 location.search 값을 통해 조회가능*/}
      <p>detail: {detail}</p>
      <p>mode: {mode}</p>
      <button onClick={onToggleDetail}>Toggle detail</button>
      <button onClick={onIncreaseMode}>mode +1</button>
    </div>
  );
};

export default About;

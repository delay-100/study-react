import { Navigate } from "react-router-dom";

const MyPage = () => {
  const isLoggedIn = false; // 사용자가 로그인을 하지 않은 경우

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />; // login 페이지로 이동, replace 옵션: 페이지를 이동할 때 현재 페이지를 페이지 기록에 남기지 않음(뒤로가기 클릭 시 두 페이지 전의 페이지로 이동)
  }

  return <div>마이 페이지</div>;
};

export default MyPage;

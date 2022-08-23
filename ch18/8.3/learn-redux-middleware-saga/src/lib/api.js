// thunk의 속성을 활용하여 웹 요청 비동기 작업을 처리하는 방법
// 웹 요청을 연습하기위해 JSONPlaceholder(https://jsonplaceholder.typicode.com)에서 제공되는 가짜 API를 사용
import axios from "axios"; // axios: API 호출 시 주로 Promise 기반 웹 클라이언트인 axios를 사용함

// API를 모두 함수화 함. 각 API를 호출하는 함수를 따로 작성하면, 나중에 사용할 때 가독성도 좋고 유지 보수도 쉬워집니다.
// 다른 파일에서 불러와 사용할 수 있도록 export 사용하여 내보내줌
export const getPost = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`); // 포스트 읽기(:id는 1~100사이 숫자)

export const getUsers = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/users`); // 모든 사용자 정보 불러오기

// sample 리듀서: src/lib/api.js의 API를 사용하여 데이터를 받아와 상태를 관리할 smaple이라는 리듀서

import { handleActions } from "redux-actions";
import * as api from "../lib/api";
import createRequestThunk from "../lib/createRequestThunk";

// 액션 타입을 선언합니다.
// 한 요청당 세 개를 만들어야 합니다.
// modules/loading.js에서 SUCCESS, FAILURE 상태를 처리하기 때문에 아래의 FAILURE은 지워도 됨. SUCCESS의 경우 성공 시 동작을 지정을 해야하므로 써야 함
// FAILURE일 경우에도 특정 동작을 지정하고 싶다면 아래의 주석을 풀면 됨.(대신 loading은 안 써도 됨) 또는 컨테이너 컴포넌트(containers/SampleContainer.js)에서 try/catch 구문을 사용해 에러 값을 조회할 수도 있음
// 여기서는 컨테이너 컴포넌트(containers/SampleContainer.js)에서 처리 중 - fn 함수
const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
// const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
// const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

// thunk 함수를 생성합니다.
// thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치합니다.

export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

// src/lib/createRequestThunk.js 파일 생성 전에는 아래의 코드를 사용해 thunk를 생성합니다.

// export const getPost = (id) => async (dispatch) => {
//   dispatch({ type: GET_POST }); // 요청을 시작한 것을 알림
//   try {
//     const response = await api.getPost(id);
//     dispatch({
//       type: GET_POST_SUCCESS,
//       payload: response.data,
//     }); // 요청 성공
//   } catch (e) {
//     dispatch({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true,
//     }); // 에러 발생
//     throw e; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌
//   }
// };

// export const getUsers = () => async (dispatch) => {
//   dispatch({ type: GET_USERS }); // 요청을 시작한 것을 알림
//   try {
//     const response = await api.getUsers();
//     dispatch({
//       type: GET_USERS_SUCCESS,
//       payload: response.data,
//     }); // 요청 성공
//   } catch (e) {
//     dispatch({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true,
//     }); // 에러 발생
//     throw e; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌
//   }
// };

// 초기 상태를 선언합니다.
// 요청의 로딩 중 상태는 loading이라는 객체에서 관리합니다.

const initialState = {
  // modules/loading.js에서 처리하기 때문에 아래의 loading 객체는 삭제 가능
  // loading: {
  //   GET_POST: false,
  //   GET_USERS: false,
  // },
  post: null,
  users: null,
};

const sample = handleActions(
  {
    // modules/loading.js에서 처리하기 때문에 아래의 loading 객체 및 [GET_POST],[GET_POST_FAILURE],[GET_USERS],[GET_USERS_FAILURE] 삭제 가능

    // [GET_POST]: (state) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: true, // 요청 시작
    //   },
    // }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      // loading: {
      //   ...state.loading,
      //   GET_POST: false, // 요청 완료
      // },
      post: action.payload,
    }),
    // [GET_POST_FAILURE]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_POST: false, // 요청 완료
    //   },
    // }),
    // [GET_USERS]: (state) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USERS: true, // 요청 시작
    //   },
    // }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false, // 요청 완료
      },
      users: action.payload,
    }),
    // [GET_USERS_FAILURE]: (state, action) => ({
    //   ...state,
    //   loading: {
    //     ...state.loading,
    //     GET_USERS: false, // 요청 완료
    //   },
    // }),
  },
  initialState
);

export default sample;

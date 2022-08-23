// sample 리듀서: src/lib/api.js의 API를 사용하여 데이터를 받아와 상태를 관리할 smaple이라는 리듀서

import { createAction, handleActions } from "redux-actions";
import * as api from "../lib/api";
import { takeLatest } from "redux-saga/effects";
// import { call, put, takeLatest } from "redux-saga/effects";
// import { startLoading, finishLoading } from "./loading";
import createRequestSaga from "../lib/createRequestSaga"; // saga가 리팩토링된 코드를 import 해옴 - 현재 import를 기준으로 위의 2줄 코드는 lib/createRequestSaga를 import 하기 전에 주석을 풀어줘야 함

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

export const getPost = createAction(GET_POST, (id) => id); // GET_POST의 경우 API 요청 시 어떤 id로 조회할 것인지 정해줘야 함
// createAction으로 액션을 만들면 액션에 필요한 추가 데이터는 payload라는 이름을 사용
/* redux-saga를 사용할 때는 id처럼 요청에 필요한 값을 액션의 payload로 넣어줘야 함
  예를들어, 지금 상황이면
  
  {
    type: 'sample/GET_POST',
    payload: 1
  }
와 같은 액션이 디스패치 됨

이러면, 이 액션을 처리하기 위한 사가(제너레이터)를 작성할 때 payload 값을 API를 호출하는 함수의 인수로 넣어줘야 함 
*/
export const getUsers = createAction(GET_USERS);

// lib/createRequestSaga로 인해 코드가 간결해짐
const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

// 아래의 saga 코드는 /lib/createRequestSaga로 리팩토링 전에 사용한 코드임

// function* getPostSaga(action) {
//   yield put(startLoading(GET_POST)); // 로딩 시작
//   // 파라미터로 action을 받아 오면 액션의 정보를 조회할 수 있습니다.
//   try {
//     // API를 호출해야 하는 상황에는 사가 내부에서 직접 호출하지 않고 call 함수를 사용합니다.
//     // call 을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있습니다.
//     // 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수입니다.
//     const post = yield call(api.getPost, action.payload); // api.getPost(action.payload)를 의미. +action.payload는 id 값임
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post.data,
//     });
//   } catch (e) {
//     // try/catch 문을 사용하여 에러도 잡을 수 있습니다.
//     yield put({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true,
//     });
//   }
//   yield put(finishLoading(GET_POST)); // 로딩 완료
// }

// function* getUsersSaga() {
//   yield put(startLoading(GET_USERS));
//   try {
//     const users = yield call(api.getUsers);
//     yield put({
//       type: GET_USERS_SUCCESS,
//       payload: users.data,
//     });
//   } catch (e) {
//     yield put({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true,
//     });
//   }
//   yield put(finishLoading(GET_USERS));
// }

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

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

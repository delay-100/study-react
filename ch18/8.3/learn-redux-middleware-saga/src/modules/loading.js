// sample 리듀서(modules/sample.js)에서 로딩 중에 대한 상태를 관리할 필요가 없게 만듦
// sample 리듀서에서 SUCCESS인 경우만 잘 관리해주면 됨
import { createAction, handleActions } from "redux-actions";

// 1. 액션 타입 정의
// 액션 타입: 대문자, 문자열 내용: '모듈 이름/액션 이름' => 문자열 안에 모듈 이름을 넣어서 액션의 이름이 충돌되지 않게 함
const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

// 2. 액션 생성 함수 만들기
export const startLoading = createAction(
  // createAction: 매번 객체를 직접 만들어 줄 필요 없이 더욱 간단하게 액션 함수 선언 가능
  START_LOADING,
  (requestType) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

// 3. 초기 상태 만들기
const initialState = {};

// 4. 리듀서 함수 만들기
const loading = handleActions(
  {
    /* 
        요청이 시작될 때 디스패치할 액션
        {
            type: 'loading/START_LOADING',
            payload: 'sample/GET_POST'
        }
    */
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true, // 액션이 디스패치 되면 loading 리듀서가 관리하고 있는 상태에서 sample/GET_POST 값을 true로 설정해줌. 만약 기존 상태에 sample/GET_POST 필드가 존재하지 않으면 새로 값을 설정해 줌
    }),
    /*
        요청이 끝날 때 디스패치할 액션
        {
            type: 'loading/FINISH_LOADING',
            payload: 'sample/GET_POST'
        }
    */
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false, // 기존에 true로 설정했던 값을 다시 false로 전환해줌
    }),
  },
  initialState
);

export default loading;

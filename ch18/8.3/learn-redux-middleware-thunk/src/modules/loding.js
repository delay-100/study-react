// sample 리듀서(modules/sample.js)에서 로딩 중에 대한 상태를 관리할 필요가 없게 만듦
// sample 리듀서에서 SUCCESS인 경우만 잘 관리해주면 됨
import { createAction, handleActions } from "redux-actions";

const START_LOADING = "loading/START_LOADING";
const FINISH_LOADING = "loading/FINISH_LOADING";

/*
    요청을 위한 액션 타입을 payload로 설정합니다(예: "sample/GET_POST").
*/

export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType
);

const initialState = {};

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

import { createAction, handleActions } from "redux-actions";

const START_LOADING = 'loading/START_LOADING'
const FINISH_LOADING = 'loading/FINISH_LOADING'

/*
    요청을 위한 액션 타입을 payload로 설정합니다 (예: "sample/GET_POST")
    createAction으로 액션을 만들면 액션에 필요한 추가 데이터는 payload라는 이름을 사용
*/

export const startLoading = createAction(
    START_LOADING,
    requestType => requestType,
)

export const finishLoading = createAction(
    FINISH_LOADING,
    requestType => requestType,
)

const initialState = {}

const loading = handleActions(
    {
        [START_LOADING]:(state, action) => ({
            ...state,
            [action.payload]:true,
        }),
        [FINISH_LOADING]: (state, action) => ({
            ...state,
            [action.payload]: false,
        }),
    },
    initialState
)

export default loading
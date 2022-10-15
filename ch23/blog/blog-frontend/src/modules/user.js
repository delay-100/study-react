import { createAction, handleActions } from 'redux-actions'
import { takeLatest, call } from 'redux-saga/effects'
import * as authAPI from '../lib/api/auth'
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga'

const TEMP_SET_USER = 'user/TEMP_SET_USER' // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    'user/CHECK',
)

const LOGOUT = 'user/LOGOUT'

export const tempSetUser = createAction(TEMP_SET_USER, user => user)
export const check = createAction(CHECK)
export const logout = createAction(LOGOUT)

const checkSaga = createRequestSaga(CHECK, authAPI.check)

// checkFailureSaga 함수 - localStorage 안에 있는 user 값을 초기화 함
// 스토어 안의 user값은 리듀서에서 CHECK_FAILURE 액션이 발생했을 때 user값을 null로 설정하도록 처리
function checkFailureSaga() {
    try {
        localStorage.removeItem('user') // localStorage에서 user를 제거
    } catch (e) {
        console.log('localStorage is not working')
    }
}


export function* logoutSaga(){
    try {
        yield call(authAPI.logout) // logout API 호출
        localStorage.removeItem('user') // localStorage에서 user를 제거
    } catch (e) {
        console.log(e)
    }
}

export function* userSaga(){
    yield takeLatest(CHECK, checkSaga)
    yield takeLatest(CHECK_FAILURE, checkFailureSaga) // CHECK_FAILURE 액션이 발생할 때 checkFailureSaga 함수가 호출되도록 함
    yield takeLatest(LOGOUT, logoutSaga)
}

const initialState ={
    user: null,
    checkError: null
}

export default handleActions(
    {
        [TEMP_SET_USER]: (state, {payload: user}) => ({
            ...state,
            user,
        }),
        [CHECK_SUCCESS]: (state, {payload: user}) => ({
            ...state,
            user,
            checkError: null,
        }),
        [CHECK_FAILURE]: (state, {payload: error}) => ({
            ...state,
            user:null,
            checkError: error,
        }),
        [LOGOUT]: state => ({
            ...state,
            user: null,
        })
    },
    initialState,
)   

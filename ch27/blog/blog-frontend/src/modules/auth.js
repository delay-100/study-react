// 첫 번째 리덕스 모듈
import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga'
import * as authAPI from '../lib/api/auth'

const CHANGE_FIELD ='auth/CHANGE_FIELD'
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'
// const SAMPLE_ACTION = 'auth/SAMPLE_ACTION'

// export const sampleAction = createAction(SAMPLE_ACTION)


// 이 선언을 한 줄씩으로 줄임! createRequestSaga를 통해 리팩토링 함!

// const REGISTER = 'auth/REGISTER'
// const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS'
// const REGISTER_FAILURE = 'auth/REGISTER_FAILURE'

// const LOGIN = 'auth/LOGIN'
// const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
// const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER',
)

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN',
)

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value}) => ({
    form, // register, login
    key, //username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
)

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register/login

export const register = createAction(REGISTER, ({ username, password}) => ({
  username,
  password,
}))

export const login = createAction(LOGIN, ({ username, password}) => ({
  username,
  password,
}))

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register)
const loginSaga = createRequestSaga(LOGIN, authAPI.login)
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga)
  yield takeLatest(LOGIN, loginSaga)
}


const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
}

const auth = handleActions(
  {
    // [SAMPLE_ACTION]: (state, action) => state,
    [CHANGE_FIELD]: (state, { payload: {form, key, value}}) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form}) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth}) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, {payload: error}) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth}) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
)

export default auth

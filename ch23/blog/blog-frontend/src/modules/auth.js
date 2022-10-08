// 첫 번째 리덕스 모듈
import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'

const CHANGE_FIELD ='auth/CHANGE_FIELD'
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'
// const SAMPLE_ACTION = 'auth/SAMPLE_ACTION'

// export const sampleAction = createAction(SAMPLE_ACTION)

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value}) => ({
    form, // register, login
    key, //username, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
)

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register


const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  }
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
    }),
  },
  initialState,
)

export default auth

// post 라는 리덕스 모듈 생성
import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as postsAPI from '../lib/api/posts'
import { takeLatest } from 'redux-saga/effects'

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] =
  createRequestActionTypes('post/READ_POST')
const UNLOAD_POST = 'post/UNLOAD_POST' // 포스트 페이지에서 벗어날 때 데이터 비우기

export const readPost = createAction(READ_POST, (id) => id)
export const unloadPost = createAction(UNLOAD_POST)

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost)
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga)
}

const initialState = {
  post: null,
  error: null,
}

const post = handleActions(
  {
    // READ_POST 액션: 포스트를 불러옴(성공/실패)
    [READ_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [READ_POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    // UNLOAD_POST 액션: 포스트 페이지를 벗어날 때 리덕스 상태의 데이터를 비움 -> 사용자가 특정 포스트를 읽은 뒤 목록으로 돌가서 또 다른 포스트를 읽을 때 아주 짧은 시간동안 이전에 불러왔던 포스트가 나타나는 깜빡임 현상을 방지함
    [UNLOAD_POST]: () => initialState,
  },
  initialState,
)

export default post

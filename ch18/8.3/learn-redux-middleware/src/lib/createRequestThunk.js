// API 요청 시 엄청 긴 thunk 함수(src/modules/sample.js)를 작성하는 것과 로딩 상태를 리듀서에서 관리하는 작업은 귀찮고 코드가 길어집니다.
// createRequestThunk.js는 반복되는 로직을 따로 분리하여 코드의 양을 줄입니다. - 유틸 함수 생성(API 요청을 해주는 thunk 함수(src/modules/sample.js)를 한 줄로 생성할 수 있게 해줌)

// modules/loading.js에서 loading 리덕스 모듈에서 만든 액션 생성 함수는 앞에서 만든 createRequestThunk에서 사용해 줌
import { startLoading, finishLoading } from "../modules/loding";

export default function createRequestThunk(type, request) {
  // 성공 및 실패 액션 타입을 정의합니다.
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type }); // 시작됨
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      }); // 성공
      dispatch(finishLoading(type));
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      }); // 에러 발생
      dispatch(startLoading(type));
      throw e;
    }
  };
}

// 사용법: createRequestThunk('GET_USERS', api.getUsers);

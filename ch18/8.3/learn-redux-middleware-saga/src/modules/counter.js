// counter.js - 카운터 리듀서
import { createAction, handleActions } from "redux-actions";
import {
  delay,
  put,
  takeEvery,
  takeLatest,
  select,
  // throttle,
} from "redux-saga/effects";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREATE_ASYNC"; // 액션 타입 선언
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

export const increase = createAction(INCREASE); // 액션이 객체 형태
export const decrease = createAction(DECREASE);

// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// () => undefined를 두 번째 파라미터로 넣어 줌
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined); // 해당 액션 타입에 대해 액션 생성함수 생성
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  // 제너레이터 함수(이름을 "사가(saga)"로 지칭) 생성
  yield delay(1000); // 1초를 기다림
  yield put(increase()); // 특정 액션을 디스패치함

  // 사가(saga) 내부에서 현재 상태를 참조해야 하는 경우 select를 사용하면 됨
  const number = yield select((state) => state.counter); // state는 스토어 상태를 의미함
  console.log(`현재 값은 ${number} 입니다`);
}

function* decreaseSaga() {
  yield delay(1000); // 1초를 기다림
  yield put(decrease()); // 특정 액션을 디스패치
}

export function* counterSaga() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리함
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // increase(+1)을 빠르게 여러번 눌렀을 때, 모든 INCREASE_ASYNC 액션에 대해 1초후 INCREASE를 발생시켜 줌
  // // takeEvery 대신 throttle 함수를 사용하면 사가가 n초에 단 한번만 호출되도록 설정 가능
  // yield throttle(3000, INCREASE_ASYNC, increaseSaga); // 첫 번째 파라미터: n초 * 1000 -> increaseSaga가 3초에 단 한번만 수행됨

  // takeLatest는 기존에 진행 중이던 작업이 있다면 취소 처리하고
  // 가장 마지막으로 실행된 작업만 수행함
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // decrease(-1)을 빠르게 여러번 눌렀을 때, DECREASE_ASYNC 액션에 대해 여러번 디스패치 되더라도 단 한번(액션 중첩 시 기존의 것들은 무시하고 가장 마지막 액션만 제대로 처리함)만 처리
}

const initialState = 0; // 상태는 꼭 객체일 필요가 없습니다. 숫자도 작동해요.
const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;

import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = createAction(INCREASE); // 액션이 객체 형태
export const decrease = createAction(DECREASE);

const initialState = 0; // 상태는 꼭 객체일 필요가 없습니다. 숫자도 작동해요.

// 1초 뒤에 increase 혹은 decrease 함수를 디스패치 함
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase()); // 액션이 함수 형태
  }, 1000);
};

export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;

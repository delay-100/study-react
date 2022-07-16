// useReducer를 통해 숫자 카운터 구현
import { useReducer } from "react";

function reducer(state, action) {
  // return { ... };

  // action.type에 따라 다른 작업 수행
  // 추후에(17장)에서 배울 리덕스에서 사용하는 액션 객체에는 어떤 액션인지 알려주는 type 필드가 꼭 있어야 하지만,
  // useReducer에서 사용하는 액션 객체는 반드시 type을 지니고 있을 필요가 없습니다. 심지어 객체가 아니라 문자열이나 숫자여도 상관없습니다.
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const CounterUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 }); // reducer의 첫 번째 파라미터: 리듀서 함수, 두 번째 파라미터: 해당 리듀서의 기본 값
  // state(현재 가리키고 있는 상태) 값과 dispatch 함수(액션을 발생시키는 함수)를 받아옴
  // dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b>입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      {/* useReducer의 장점: 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있습니다.*/}
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
    </div>
  );
};

export default CounterUseReducer;

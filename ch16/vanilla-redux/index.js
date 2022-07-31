import { createStore } from "redux";

// DOM 레퍼런스 만들기 - UI를 관리할 때 별도의 라이브러리를 사용하지 않기 때문에 DOM을 직접 수정해주어야 함
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

// 액션: 프로젝트의 상태에 변화를 일으키는 것
// 액션 타입: 액션의 이름을 정의(문자열 형태로 주로 대문자로 작성, 이름은 고유해야 함)
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 함수 생성: 액션 이름을 사용하여 액션 객체를 만듦
// 액션 객체는 type 값을 반드시 갖고 있어야 하며, 추후 상태 업데이트 시 참고하고 싶은 값은 마음대로 넣을 수 있음
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// 초기값 설정: 초기값의 형태는 자유임(숫자, 문자, 객체)
const initialState = {
  toggle: false,
  counter: 0,
};

// 리듀서: 변화를 일으키는 함수
// 리듀서 함수 정의: 함수의 파라미터로는 state와 action 값을 받아옴

// 리듀서 함수가 맨 처음 호출될 때는 state값이 undefined임
// state가 undefined일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  // action.type에 따라 다른 작업을 처리함
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        // 리듀서에서는 상태의 불변성을 유지하면서 데이터에 변화를 일으켜주어야 함
        ...state, // spread(...) 연산자: 불변성 유지.
        // 단, 객체의 구조가 복잡해지면(ex. object.something.inside.value) spread 연산자로 불변성을 관리하며 업데이트 하는 것이 번거로울 수 있고 가독성이 나빠질 수 있어서 리덕스의 상태는 최대한 깊지 않은 구조로 진행하는 것이 좋음
        // 객체의 구조가 복잡해지거나 배열도 함께 다루는 경우 immer 라이브러리를 사용하면 좀 더 쉽게 리듀서 작성이 가능
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

// 스토어 생성: createStore 함수 사용
// 상단에 import 구문으로 리덕스에서 해당 함수를 받아와야 함
const store = createStore(reducer); // 함수의 파라미터에 리듀서를 넣어줘야 함
// render 함수 작성: 이 함수는 상태가 업데이트될 때마다 호출됨
// 리액트의 render 함수와는 다르게 이미 html을 사용하여 만들어진 UI의 속성을 상태에 따라 변경해줌
const render = () => {
  const state = store.getState(); // 현재 상태를 불러옴
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  // 카운터 처리
  counter.innerText = state.counter;
};

render();

// 구독하기: 스토어의 상태가 바뀔 때마다 방금 만든 render 함수가 호출되도록 해줌(스토어 내장함수 subscribe 사용)
// subscribe 함수의 파라미터로는 함수 형태의 값을 전달함. 전달된 함수는 추후 액션이 발생하여 상태가 업데이트 될 때마다 호출됨
store.subscribe(render);

// 디스패치: 액션을 발생시키는 것(스토어 내장함수 dispatch 사용)
// dispatch 함수의 파라미터로는 액션 객체를 넣어줌.
divToggle.onclick = () => {
  store.dispatch(toggleSwitch()); // 각 DOM 요소에 클릭 이벤트 설정
  // 이벤트 함수 내부에서는 dispatch 함수를 사용하여 액션을 스토어에게 전달해줌
};

btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
  store.dispatch(decrease());
};

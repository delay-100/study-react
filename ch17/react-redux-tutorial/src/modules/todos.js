// 1. 액션 타입 정의하기
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경함
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE'; // todo를 체크/체크 해제함
const REMOVE = 'todos/REMOVE'; // todo를 제그함

// 2. 액션 생성 함수 만들기
export const changeInput = (input) => ({
  type: CHANGE_INPUT,
  input,
});

let id = 3; // id: 각 todo 객체가 갖고 있게 될 고윳값(3인 이유: 초기 상태 작성 시 todo 객체 두 개를 사전에 넣을 것이기 때문)
// insert가 호출될 때마다 id가 1씩 더해집니다.
export const insert = (text) => ({
  type: INSERT,
  todo: {
    id: id++,
    text,
    done: false,
  },
});

export const toggle = (id) => ({
  type: TOGGLE,
  id,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});

// 3. 초기 상태 및 리듀서 함수 만들기
// 객체에 한 개 이상의 값이 들어가므로 불변성을 유지해줘야 함(spread 연산자 사용)
// 배열에 변화를 줄 때는 배열 내장 함수를 사용하여 구현하면 됨
const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false,
    },
  ],
};

function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        inpuit: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo,
        ),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
}

export default todos;

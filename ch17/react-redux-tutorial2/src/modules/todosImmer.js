// 7 - 추가내용. redux-actions 라이브러리 사용하기
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 1. 액션 타입 정의하기
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경함
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE'; // todo를 체크/체크 해제함
const REMOVE = 'todos/REMOVE'; // todo를 제그함

// 2. 액션 생성 함수 만들기
// redux-actions 라이브러리 中 createAction 사용한 경우
export const changeInput = createAction(CHANGE_INPUT, (input) => input);
// 아래는 redux-actions 라이브러리를 사용하지 않았을 때의 코드임
// export const changeInput = (input) => ({
//   type: CHANGE_INPUT,
//   input,
// });

let id = 3; // id: 각 todo 객체가 갖고 있게 될 고윳값(3인 이유: 초기 상태 작성 시 todo 객체 두 개를 사전에 넣을 것이기 때문)
// insert가 호출될 때마다 id가 1씩 더해집니다.

// 추가(insert)의 경우 todo 객체를 액션 객체 안에 넣어 주어야 하기 때문에 두 번째 파라미터에 text를 넣으면 todo 객체가 반환되는 함수를 넣어줌
export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));

// 파라미터를 그대로 반환하는 함수(id=>id를 생략해도 똑같이 반환하지만 어떤 값이 파라미터로 필요한지 직관적일 수 있게 써줌)
export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);

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

// + immer 적용
// redux-actions 라이브러리 中 handleActions 함수로 리듀서 재작성
const todos = handleActions(
  {
    // 아래에서 쓰이는 payload: createAction으로 액션 생성 함수를 만든 경우 파라미터로 받은 값을 다 action.payload로 사용함
    // immer/payload 객체 비구조화 할당/일반 action.payload 적용 코드가 한 줄씩 적혀있음
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, (draft) => {
        draft.input = input;
      }),
    // [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }), // payload의 이름을 잘 구분하기 위해 객체 비구조화 할당 적용
    // [CHANGE_INPUT]: (state, action) => ({ ...state, input: action.payload }),

    [INSERT]: (state, { payload: todo }) =>
      produce(state, (draft) => {
        draft.todos.push(todo);
      }),
    // [INSERT]: (state, { payload: todo }) => ({
    //   ...state,
    //   todos: state.todos.concat(todo),
    // }),
    // [INSERT]: (state, action) => ({
    //   ...state,
    //   todos: state.todos.concat(action.payload), // concat: 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환
    // }),

    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    // [TOGGLE]: (state, { payload: id }) => ({
    //   ...state,
    //   todos: state.todos.map((todo) =>
    //     todo.id === id ? { ...todo, done: !todo.done } : todo,
    //   ),
    // }),
    // [TOGGLE]: (state, action) => ({
    //   ...state,
    //   todos: state.todos.map((todo) =>
    //     todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
    //   ),
    // }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }),
    // [REMOVE]: (state, action) => ({
    //   ...state,
    //   todos: state.todos.filter((todo) => todo.id !== action.payload),
    // }),
  },
  initialState,
);

// 아래는 redux-actions 라이브러리를 사용하지 않았을 때의 코드임
// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input,
//       };
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo),
//       };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo,
//         ),
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.id),
//       };
//     default:
//       return state;
//   }
// }

export default todos;

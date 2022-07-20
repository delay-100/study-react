// import { useState, useRef, useCallback } from 'react'; // 2-1. useState 이용
import { useReducer, useRef, useCallback } from 'react'; // 2-1. useReducer 이용
import TodoInsert from './components/TodoInstert';
import TodoTemplate from './components/TodoTemplate';
import TodoList from './components/TodoList';

// createBulkTodos 함수 - 데이터 2500개를 자동으로 생성해주는 함수
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': //새로 추가
      // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false}}
      return todos.concat(action.todo);
    case 'REMOVE': //제거
      // { type: 'REMOVE', id: 1}
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE': //토글
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos); // useReducer의 첫 번째 파라미터: 리듀서 함수, 두 번째 파라미터: undefined, 세 번째 파라미터: 초기 상태를 만들어주는 createBulkTodos -> 컴포넌트가 맨 처음 렌더링될 떄만 createBulkTodos 함수가 호출됨
  // 원래는 첫 번째 파라미터에 리듀서 함수, 두 번째 파라미터에 초기 상태를 넣어줘야 함

  // const [todos, setTodos] = useState(createBulkTodos); // 데이터를 직접 입력하기는 힘드므로, 데이터를 자동으로 생성하는 함수 호출
  // useState(createBulkTodos())로 작성하면 리렌더링될 때마다 createBulkTodos 함수가 호출되지만
  // useState(createBulkTodos)처럼 파라미터를 함수 형태로 넣어 주면 컴포넌트가 처음 렌더링될 때만 createBulkTodos 함수가 실행됨

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501); // id값은 useRef를 사용하여 관리 => id 값은 렌더링되는 정보가 아니고, 새로운 항목을 만들 때 참조되는 값일 뿐이기 때문

  // onInsert 함수 - App 컴포넌트에서 todos 배열에 새 객체를 추가하는 함수
  const onInsert = useCallback(
    // 컴포넌트의 성능을 아낄 수 있도록 useCallback으로 감싸줌(props로 전달해야 할 함수를 만들 때는 useCallback을 사용해 함수를 감싸줌)
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({ type: 'INSERT', todo });
      // setTodos((todos) => todos.concat(todo));
      nextId.current += 1; // nextId 1씩 더하기
    },
    [], // useCallback 두 번째 파라미터: input(todos)이 바뀌거나 새로운 항목이 추가될 때 새로운 함수 생성
    // 함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜주어야 함
  );

  // onRemove 함수 - App 컴포넌트에 id를 파라미터로 받아와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수
  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
    // setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
    // setTodos((todos) =>
    //   todos.map(
    //     (todo) =>
    //       // 배열 내장 함수 map을 사용해 특정 id를 가지고 있는 객체의 checked 값을 반전시켜 줌
    //       // 특정 배열 원소를 업데이트해야 할 때 이렇게 map을 사용하면 짧은 코드로 쉽게 작성 가능
    //       todo.id === id ? { ...todo, checked: !todo.checked } : todo, // todo.id와 현재 파라미터로 사용된 id 값이 같을 때는 새로운 객체를 생성하지만, id 값이 다를 때는 처음 받아왔던 상태 그대로를 반환함
    //   ),
    // );
  }, []);
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      {/* todos, onRemove를 TodoList의 props로 전달*/}
    </TodoTemplate>
  );
};
export default App;

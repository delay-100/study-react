import { useState, useRef, useCallback } from 'react';
import TodoInsert from './components/TodoInstert';
import TodoTemplate from './components/TodoTemplate';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    // 나중에 추가할 일정 항목에 대한 상태들은 모두 App 컴포넌트에서 관리함
    // useState를 사용하여 todos라는 상태를 정의
    {
      id: 1, // 각 항목의 고유 id
      text: '리액트의 기초 알아보기', // 내용
      checked: true, // 완료 여부
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '투두리스트 만들어 보기',
      checked: false,
    },
  ]);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4); // id값은 useRef를 사용하여 관리 => id 값은 렌더링되는 정보가 아니고, 새로운 항목을 만들 때 참조되는 값일 뿐이기 때문

  // onInsert 함수 - App 컴포넌트에서 todos 배열에 새 객체를 추가하는 함수
  const onInsert = useCallback(
    // 컴포넌트의 성능을 아낄 수 있도록 useCallback으로 감싸줌(props로 전달해야 할 함수를 만들 때는 useCallback을 사용해 함수를 감싸줌)
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; // nextId 1씩 더하기
    },
    [todos],
  );

  // onRemove 함수 - App 컴포넌트에 id를 파라미터로 받아와서 같은 id를 가진 항목을 todos 배열에서 지우는 함수
  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map(
          (todo) =>
            // 배열 내장 함수 map을 사용해 특정 id를 가지고 있는 객체의 checked 값을 반전시켜 줌
            // 특정 배열 원소를 업데이트해야 할 때 이렇게 map을 사용하면 짧은 코드로 쉽게 작성 가능
            todo.id === id ? { ...todo, checked: !todo.checked } : todo, // todo.id와 현재 파라미터로 사용된 id 값이 같을 때는 새로운 객체를 생성하지만, id 값이 다를 때는 처음 받아왔던 상태 그대로를 반환함
        ),
      );
    },
    [todos],
  );
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      {/* todos, onRemove를 TodoList의 props로 전달*/}
    </TodoTemplate>
  );
};
export default App;

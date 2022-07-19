import { useState } from 'react';
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
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList todos={todos} /> {/* todos를 TodoList의 props로 전달*/}
    </TodoTemplate>
  );
};
export default App;

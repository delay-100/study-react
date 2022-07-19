import TodoListItem from './TodoListItem';
import './TodoList.scss';

// App.js에서 todos={todos}로 props를 넘겨주었기 때문에 이 값을 받아 온 후 TodoItem으로 변환하여 렌더링하도록 설정해야 함
const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className="TodoList">
      {/* props로 받아온 todos 배열을 배열 내장 함수 map을 통해 TodoListItem으로 이루어진 배열로 변환하여 렌더링함
        map을 사용하여 컴포넌트로 변환할 때는 key props를 전달해주어야 함(여기서는 key값에 각 항목마다 가지고 있는 고유값인 id를 넣어 줌)
        그리고 여러 종류의 값을 전달해줘야 하는 todo데이터의 경우 통째로 전달하는 편이 나중에 성능 최적화 시 편리함 
        => TodoListItem으로 이동 */}
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;

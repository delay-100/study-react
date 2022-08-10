// Todos.js: 해야 할 일을 추가하고, 체크하고, 삭제할 수 있는 할 일 목록 컴포넌트

// TodoItem 컴포넌트: 이미 저장된 각각의 투두 컴포넌트

const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div>
      <input
        type="checkbox"
        onClick={() => onToggle(todo.id)}
        checked={todo.done}
        readOnly={true}
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)}>삭제</button>
    </div>
  );
};

// Todos 컴포넌트: 반환할 전체 Todo 묶음
const Todos = ({
  input, // 인풋에 입력되는 텍스트
  todos, // 할 일 목록이 들어 있는 객체
  onChangeInput,
  onInsert,
  onToggle,
  onRemove,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    onInsert(input);
    onChangeInput(''); // 등록 후 인풋 초기화
  };
  const onChange = (e) => onChangeInput(e.target.value);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <div>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;

// 이 곳부터 아래의 코드는 2. UI 컴포넌트의 코드

// const TodoItem = ({ todo, onToggle, onRemove }) => {
//   return (
//     <div>
//       <input type="checkbox" />
//       <span>예제 텍스트</span>
//       <button>삭제</button>
//     </div>
//   );
// };

// // Todos 컴포넌트: 반환할 전체 Todo 묶음
// const Todos = ({
//   input, // 인풋에 입력되는 텍스트
//   todos, // 할 일 목록이 들어 있는 객체
//   onChangeInput,
//   onInsert,
//   onToggle,
//   onRemove,
// }) => {
//   const onSubmit = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input />
//         <button type="submit">등록</button>
//       </form>
//       <div>
//         <TodoItem />
//         <TodoItem />
//         <TodoItem />
//         <TodoItem />
//         <TodoItem />
//         <TodoItem />
//       </div>
//     </div>
//   );
// };

// export default Todos;

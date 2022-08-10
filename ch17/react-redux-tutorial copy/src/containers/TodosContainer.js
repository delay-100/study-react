import { connect } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';

// 이전에 todos 모듈에서 작성했던 액션 생성 함수와 상태 안에 있던 값을 컴포넌트의 props로 전달해주었음
const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
}) => {
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={changeInput}
      onInsert={insert}
      onToggle={toggle}
      onRemove={remove}
    />
  );
};

export default connect(
  // 비구조화 할당을 통해 todos를 분리하여
  // state.todos.input 대신 todos.input을 사용
  ({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }),
  {
    // 두 번째 파라미터를 아예 객체 형태로 넣어주어 connect 함수가 내부적으로 bindActionCreators 작업을 대신 하도록 함
    changeInput,
    insert,
    toggle,
    remove,
  },
)(TodosContainer);

import React from 'react';
// import { useCallback } from 'react'; -> useDispatch 사용 시 필요
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';
import { useActions } from '../lib/useActions';

const TodosContainerHooks = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    // 1. useSelector 할당 시 비구조화 할당을 이용함
    input: todos.input,
    todos: todos.todos,
  }));

  // // useDispatch 사용 시 각 액션을 디스패치하는 함수들을 만듦
  // // 액션의 종류가 총 4가지(onChangeInput, onInsert, onToggle, onRemove)로 많은데 어떤 값이 액션 생성 함수의 파라미터로 사용되어야 하는지 일일이 명시하고 있음 -> 번거로움
  // const dispatch = useDispatch();  const onChangeInput = useCallback(
  //   (input) => dispatch(changeInput(input)),
  //   [dispatch],
  // );
  // const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  // const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  // const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);

  // 위의 useDispatch의 번거로움을 해소하기 위한 코드(src/lib/useActions 파일 생성 후 작성)
  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    [],
  );
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

// export default TodosContainerHooks;
export default React.memo(TodosContainerHooks);
// useSelector 이용 시 최적화 작업이 자동으로 이루어지지 않아 성능 최적화를 위해 React.memo를 컨테이너 컴포넌트에 사용해줘야 함
// 반면, connect 함수: 해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 해당 컨테이너 컴포넌트의 props가 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성능이 최적화됨
// 지금 프로젝트에서는 TodosContainerHooks의 부모 컴포넌트인 App 컴포넌트가 리렌더링되는 일이 없으므로 불필요한 성능 최적화임

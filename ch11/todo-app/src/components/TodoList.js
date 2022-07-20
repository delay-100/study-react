import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

// App.js에서 todos={todos}로 props를 넘겨주었기 때문에 이 값을 받아 온 후 TodoItem으로 변환하여 렌더링하도록 설정해야 함
const TodoList = ({ todos, onRemove, onToggle }) => {
  // List 컴포넌트를 사용하기 위해 rowRenderer라는 함수를 새로 작성함
  // 이 함수는 react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 때 사용하며,
  // 이 함수를 list 컴포넌트의 props로 설정해주어야 함
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      // 이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아와서 사용함
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos], // 배열 안에 onRemove, onToggle, todos를 넣은 경우: input(여기서는 onRemove, onToggle, todos)이 바뀌거나 새로운 항목이 추가될 때 새로운 함수 생성
    // 함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜주어야 함
    // 받아온 onRemove, onToggle, todos를 넣어 반환해야하기 때문에 배열 안에 onRemove, onToggle, todos를 꼭 넣어주어야 함
  );
  return (
    // List 컴포넌트를 사용할 때는 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더링할 때 사용해야 하는 함수, 그리고 배열을 props로 넣어줘야 함
    // 그러면 이 컴포넌트가 전달받은 props를 사용하여 자동으로 최적화 해줌
    <List
      className="TodoList"
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    />
    // <div className="TodoList">
    //   {/* props로 받아온 todos 배열을 배열 내장 함수 map을 통해 TodoListItem으로 이루어진 배열로 변환하여 렌더링함
    //     map을 사용하여 컴포넌트로 변환할 때는 key props를 전달해주어야 함(여기서는 key값에 각 항목마다 가지고 있는 고유값인 id를 넣어 줌)
    //     그리고 여러 종류의 값을 전달해줘야 하는 todo데이터의 경우 통째로 전달하는 편이 나중에 성능 최적화 시 편리함
    //     => TodoListItem으로 이동 */}
    //   {todos.map((todo) => (
    //     <TodoListItem
    //       todo={todo}
    //       key={todo.id}
    //       onRemove={onRemove}
    //       onToggle={onToggle}
    //     />
    //   ))}
    // </div>
  );
};

export default React.memo(TodoList);

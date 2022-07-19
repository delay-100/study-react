import { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md'; // import 아이콘이름 from 'react-icons-md';
// https://react-icons.netlify.com/#/icons/md 페이지에 들어가서 Material Design icons에서 아이콘이름을 고름
import './TodoInsert.scss';

// App.js에서 TodoInsert에 onInsert 함수를 넣어줌
const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState(''); // TodoInsert 컴포넌트에서 input에 입력하는 값을 관리할 수 있도록 useState를 사용하여 value라는 함수를 정의함

  const onChange = useCallback((e) => {
    // input에 넣어 줄 onChange 함수도 작성해줘야 함
    // => 이 과정에서 컴포넌트가 리렌더링될 때마다 함수를 새로 만드는 것이 아니라 한번 함수를 만들고 재사용 할 수 있도록 useCallback Hook을 사용함
    setValue(e.target.value);
  }, []);

  // onSubmit 함수 - form의 onSubmit으로 설정
  // 이 함수 호출 시 props로 받아 온 onInsert 함수에 현재 value 값을 파라미터로 넣어서 호출하고 현재 value 값을 초기화 함
  // onClick도 가능한데, onSubmit은 input에서 Enter을 넣었을 때도 실행되기 때문에 사용했음(onClick은 onKeyPress 이벤트를 통해 Enter 감지 로직을 따로 해줘야 함)
  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue(''); // value 값 초기화

      // submit 이벤트는 브라우저에서 새로고침을 발생시킵니다.
      // e.preventDefault() - 새로고침을 방지하기 위해 이 함수를 호출합니다.
      e.preventDefault();
    },
    [onInsert, value],
  );
  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;

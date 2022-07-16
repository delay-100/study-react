// useState를 통해 숫자 카운터 구현
import { useState } from "react"; // useState는 코드 상단에서 import 구문을 통해 불러옴

const Counter = () => {
  const [value, setValue] = useState(0); // useState 함수의 파라미터에는 상태의 기본값을 넣어 줌 - 현재는 0을 넣어줌 => 카운터의 기본값을 0으로 지정
  // 이 함수 호출 시 배열을 반환하는데 배열의 첫 번째 원소: 상태값, 두 번째 원소: 상태를 설정하는 함수(이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링됨)

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b>입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};

export default Counter;

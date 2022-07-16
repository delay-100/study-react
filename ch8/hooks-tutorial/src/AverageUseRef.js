// 리스트에 숫자를 추가하면 추가된 숫자들의 평균을 보여 주는 함수 컴포넌트

import { useState, useMemo, useCallback, useRef } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const AverageUseRef = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null); // useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킴

  const onChange = useCallback((e) => {
    // useCallback의 첫 번째 파라미터: 생성하고 싶은 함수, 두 번째 파라미터: 배열
    setNumber(e.target.value);
  }, []); // 비어있는 배열: 컴포넌트가 처음 렌더링될 때만 함수 생성, 컴포넌트가 렌더링될 때 만들었던 함수를 계속해서 재사용함
  // onChange는 기존의 값을 조회하지 않고 바로 설정만 하기 때문에 배열이 비어 있어도 상관없음

  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    inputEl.current.focus(); // useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킴
  }, [number, list]); // 배열 안에 number와 list를 넣은 경우: input(여기서는 number 혹은 list)이 바뀌거나 새로운 항목이 추가될 때 새로운 함수 생성
  // 함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜주어야 함
  // 기존의 number와 list를 조회해서 nextList를 생성하기 때문에 배열 안에 number와 list를 꼭 넣어주어야 함

  const avg = useMemo(() => getAverage(list), [list]); // list 배열의 내용이 바뀔 때만 getAverage 함수가 호출됨

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      {/* useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킴 */}
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default AverageUseRef;

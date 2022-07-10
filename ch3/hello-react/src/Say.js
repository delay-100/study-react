import { useState } from 'react';

const Say = () => {
  const [message, setMessage] = useState(''); // useState 함수의 인자에 상태의 초기값을 넣어줌
  // 클래스형 컴포넌트에서 state 초기값은 객체 형태를 넣어주어야 하지만, useState에서는 반드시 객체가 아니어도 상관 없음. 값의 형태는 자유임(숫자, 문자, 객체, 배열 등..)
  // 함수 호출 시 배열이 반환되는데, 배열의 첫 번째 원소: 현재 상태, 두 번째 원소: 상태를 바꾸어 주는 함수(세터(setter) 함수라고 함)
  // 배열의 비구조화 할당을 통해 이름을 자유롭게 정해 줄 수 있음(현재는 message, setMessage로 이름을 지음)

  const onClickEnter = () => setMessage('안녕하세요!');
  const onClickLeave = () => setMessage('안녕히 가세요!');

  const [color, setColor] = useState('black');

  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{ color }}>{message}</h1>
      <button style={{ color: 'red' }} onClick={() => setColor('red')}>
        빨간색
      </button>
      <button style={{ color: 'green' }} onClick={() => setColor('green')}>
        초록색
      </button>
      <button style={{ color: 'blue' }} onClick={() => setColor('blue')}>
        파란색
      </button>
    </div>
  );
};

export default Say;

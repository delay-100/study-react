// 여러 개의 input 처리하기 - 함수 컴포넌트

import { useState } from "react";

const EventPractice2InputFun = () => {
  const [form, setForm] = useState({
    // 함수 호출 시 배열이 반환되는데, 배열의 첫 번째 원소: 현재 상태, 두 번째 원소: 상태를 바꾸어 주는 함수(세터(setter) 함수라고 함)

    // useState가 객체 형태임
    // useState함수 인자에 상태의 초기값을 넣어줌
    username: "",
    message: "",
  });
  const { username, message } = form;
  const onChange = (e) => {
    const nextForm = {
      ...form, // 기존의 form 내용을 이 자리에 복사한 뒤  - 이전거 가져오는 이유: 리액트에서 상태 불변성을 유지해야하기 위해서
      // form은 username과 message의 원래 있던 값임
      [e.target.name]: e.target.value, // 원하는 값을 덮어 씌우기
    };
    setForm(nextForm);
  };

  const onClick = () => {
    alert(username + ": " + message);
    setForm({
      username: "",
      message: "",
    });
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        paceholder="사용자명"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        name="message"
        paceholder="아무거나 입력해 보세요"
        value={message}
        onChange={onChange}
        onKeyPress={onKeyPress} // 이 input(2번째 input)에서 Enter 클릭 시 확인 버튼이 클릭됨
      />
      <button onClick={this.handleClick}>확인</button>
    </div>
  );
};

export default EventPractice2InputFun;

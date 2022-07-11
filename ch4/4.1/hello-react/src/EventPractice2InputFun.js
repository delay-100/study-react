// 여러 개의 input 처리하기 - 함수 컴포넌트

import { useState } from "react";

const EventPractice2InputFun = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeMessage = (e) => setMessage(e.target.value);

  const onClick = () => {
    alert(username + ": " + message);
    setUsername("");
    setMessage("");
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
        onChange={onChangeUsername}
      />
      <input
        type="text"
        name="message"
        paceholder="아무거나 입력해 보세요"
        value={message}
        onChange={onChangeMessage}
        onKeyPress={onKeyPress} // 이 input(2번째 input)에서 Enter 클릭 시 확인 버튼이 클릭됨
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice2InputFun;

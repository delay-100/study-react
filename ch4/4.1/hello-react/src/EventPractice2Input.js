// 여러 개의 input 처리하기

import { Component } from "react";

class EventPractice2Input extends Component {
  state = {
    username: "",
    message: "",
  };

  handleChange = (e) => {
    // 화살표 함수 형태로 메서드를 정의함
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value, // 객체 안에서 key를 []로 감싸면 그 안에 넣은 레퍼런스가 가리키는 실제 값이 key 값으로 사용됨
      // 즉, e.target.name으로 입력되는 값이 key(username, message)로 이용됨
    });
  };

  handleClick = () => {
    alert(this.state.username + ": " + this.state.message);

    this.setState({
      username: "",
      message: "",
    });
  };

  // Enter를 눌렀을 때 handleClick 메서드를 호출하도록 하는 코드 - onKeyPress 이벤트 핸들링
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="username" // name이 username인 input을 render함
          paceholder="사용자명"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="message" // name이 messasge인 input을 render함
          paceholder="아무거나 입력해 보세요"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress} // 이 input(2번째 input)에서 Enter 클릭 시 확인 버튼이 클릭됨
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPractice2Input;

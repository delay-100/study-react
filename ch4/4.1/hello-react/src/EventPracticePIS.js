// Property Initializer Syntax를 사용해 메서드 작성

import { Component } from "react";

class EventPracticePIS extends Component {
  state = {
    message: "",
  };

  handleChange = (e) => {
    // 화살표 함수 형태로 메서드를 정의함
    console.log(e.target.value);
    this.setState({
      message: e.target.value,
    });
  };

  handleClick = () => {
    alert(this.state.message);

    this.setState({
      message: "",
    });
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          paceholder="아무거나 입력해 보세요"
          value={this.state.message}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPracticePIS;

// 기본 코드
import { Component } from "react";

class EventPractice extends Component {
  state = {
    message: "",
  };

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해 보세요"
          value={this.state.message}
          onChange={(e) => {
            // 이벤트 렌더링 시 함수를 만들어 보내줌
            // console.log(e);
            console.log(e.target.value);
            this.setState({
              message: e.target.value,
            });
          }}
        />
        <button
          onClick={() => {
            // 이벤트 렌더링 시 함수를 만들어 보내줌
            alert(this.state.message); // 현재 comment 값을 메시지 박스로 띄움
            this.setState({
              // comment 값을 공백으로 설정
              message: "",
            });
          }}
        >
          확인
        </button>
      </div>
    );
  }
}

export default EventPractice;

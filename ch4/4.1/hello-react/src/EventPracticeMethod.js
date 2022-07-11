// 기본 코드 -> 메서드로 변환한 코드
import { Component } from "react";

class EventPracticeMethod extends Component {
  state = {
    message: "",
  };

  // 컴포넌트에 state를 설정할 때는 다음과 같이 constructor 메서드를 작성하여 설정함
  // 컴포넌트 생성자 메서드
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this); // 함수가 호출될 때 this는 호출부에 따라 결정되므로, 클래스의 ㅇ미의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서, 메서드와 this의 관계가 끊어져버림.
    // 그래서 임의 메서드가 이벤트로 등록되어도 this가 컴포넌트 자신으로 제대로 가리키기 위해서는 메서드를 this와 바인딩(binding)하는 작업이 필요함.
    // 만약 바인딩하지 않으면 this가 undefined를 가리키게 됨
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      message: e.target.value,
    });
  }

  handleClick() {
    alert(this.state.message);
    this.setState({
      message: "",
    });
  }

  render() {
    return (
      <div>
        <h1>이벤트 연습</h1>
        <input
          type="text"
          name="message"
          placeholder="아무거나 입력해 보세요"
          value={this.state.message} // 함수가 호출될 때 this는 호출부에 따라 결정되므로, 클래스의 ㅇ미의 메서드가 특정 HTML 요소의 이벤트로 등록되는 과정에서, 메서드와 this의 관계가 끊어져버림.
          // 그래서 임의 메서드가 이벤트로 등록되어도 this가 컴포넌트 자신으로 제대로 가리키기 위해서는 메서드를 this와 바인딩(binding)하는 작업이 필요함.
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>확인</button>
      </div>
    );
  }
}

export default EventPracticeMethod;

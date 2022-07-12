import { Component } from "react";
import "./ValidationSample.css";

class ValidationSample extends Component {
  state = {
    password: "",
    clicked: false,
    validated: false,
  };

  // state의 password 값을 업데이트함
  handleChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  // clicked의 값을 참으로 설정, validated 값을 검증 결과로 설정
  handleButtonClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === "0000",
    });
    this.inputfocus.focus(); // 버튼 클릭 시 input으로 focus가 이동하도록 함
  };

  render() {
    return (
      <div>
        <input
          ref={(ref) => (this.inputfocus = ref)} // 콜백 함수를 사용하여 ValidationSample 컴포넌트에 ref를 달아줌, this.input이 컴포넌트 내부의 input 요소를 가리키고 있음 => 일반 dom 다루듯 코드를 작성하면
          type="password"
          value={this.state.password}
          onChange={this.handleChange} // onChange 이벤트가 발생하면 handleChange를 호출
          className={
            // className값: button 누르기 전 - 비어 있는 문자열 전달, button 누른 후 - 검증 결과에 따라 success 또는 failure 값 설정
            // success인 경우 input 색상이 초록색, failure인 경우 input 색상이 빨간색으로 변함
            this.state.clicked
              ? this.state.validated
                ? "success"
                : "failure"
              : ""
          }
        />
        <button onClick={this.handleButtonClick}>검증하기</button>
        {/* onClilck 이벤트가 발생하면 handleButtonClick을 호출*/}
      </div>
    );
  }
}

export default ValidationSample;

import { Component } from "react";
// import ValidationSample from "./ValidationSample";
import ScrollBox from "./ScrollBox";

class App extends Component {
  render() {
    // return <ValidationSample />;
    return (
      <div>
        <ScrollBox ref={(ref) => (this.scrollBox = ref)} />
        <button onClick={() => this.scrollBox.scrollToBottom()}>
          {" "}
          {/* 컴포넌트가 처음 렌더링될 때는 this.scrollBox 값이 undefined이므로 this.scrollBox.scrollToBottom 값을 읽어 오는 과정에서 오류가 발생 
        -> 화살표 함수를 만들어서 그 내부에서 this.scrollBox.scrollToBottom 메서드를 실행하면 버튼을 누를 때 (이미 한번 렌더링을 했기 때문에 - this.scrollBox를 설정한 시점) 오류가 발생하지 않음 => 그래서 화살표함수를 만들어준 것임*/}
          {/* onClick = {this.scrollBox.scrollToBottom() 해도 문법상 문제는 없음*/}
          맨 밑으로
        </button>
      </div>
    );
  }
}

export default App;

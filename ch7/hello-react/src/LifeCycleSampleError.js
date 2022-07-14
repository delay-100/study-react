import { Component } from "react";

// 각 lifecycle을 실행할 때마다 콘솔 디버거에 기록하고, 부모 컴포넌트에서 props로 색상을 받아 버튼을 누르면 state.number 값을 1씩 더함
class LifeCycleSampleError extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null; // ref를 설정할 부분

  // 컴포넌트에 state를 설정할 때는 다음과 같이 constructor 메서드를 작성하여 설정함
  // 컴포넌트 생성자 메서드
  constructor(props) {
    // 클래스형 컴포넌트에서 constructor를 작성할 때는 반드시 이 문장을 호출해야 함
    // 함수 호출 시 현재 클래스형 컴포넌트가 상속받고 있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출해줌
    super(props);
    console.log("constructor");
  }

  /* 아래부터 업데이트할 때 호출하는 메서드를 순서대로 나열함 */

  // getDerivedStateFromProps 메서드 - props로 받아 온 값을 state에 동기화시키는 용도로 사용하며, 컴포넌트가 마운트될 때와 업데이트 될 때 호출됨
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      // 조건에 따라 특정 값 동기화
      return { color: nextProps.color }; // 부모에게 받은 color 값을 state에 동기화 하고 있음
    }
    return null; // state를 변경할 필요가 없다면 null을 반환
  }

  // ComponentDidMount 메서드 - 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행
  // 이 안에서 다른 자바스크립트 라이브러리 또는 프레임워크의 함수를 호출하거나 이벤트 등록, setTimeout, setInterval, 네트워크 요청 같은 비동기 작업을 처리하면 됨
  componentDidMount() {
    console.log("componentDidMount");
  }

  // shouldComponentUpdate 메서드 - props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드
  // 이 메서드에서는 반드시 true값 또는 false값을 반환해야함
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다.
    return nextState.number % 10 !== 4; // state.number 값의 마지막 자리 수가 4이면(예, 4, 14, 24) 리렌더링을 취소하도록 설정
  }

  // componentWillUnmount 메서드 - 컴포넌트를 DOM에서 제거할 때 실행
  // componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 있다면 여기서 제거 작업을 해야 함
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  // getSnapshotBeforeUpdate 메서드 - render에서 만들어진 결과물이 브라우저에 실제로 반영되기 직전에 호출됨
  // 이 메서드의 반환 값은 componentDidUpdate에서 세 번째 파라미터인 snapshot 값으로 전달받을 수 있음 -> 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용됨
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      // DOM에 변화가 일어나기 직전의 색상 속성을 snapshot 값으로 반환하여 이것을 componentDidUpdate에서 조회할 수 있게함
      return this.myRef.style.color;
    }
    return null;
  }

  // componentDidUpdate 메서드 - 리렌더링을 완료한 후 실행함
  // 업데이트가 끝난 직후이므로, DOM 관련 처리를 해도 됨.
  // 여기서는 prevProps 또는 prevState를 사용하여 컴포넌트가 이전에 가졌던 데이터에 접근 가능
  // getSnapshotBeforeUpdate에서 반환한 값이 있다면 여기서 snapshot 값을 전달받을 수 있음
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("업데이트되기 직전 색상: ", snapshot);
    }
  }

  render() {
    console.log("render");

    const style = {
      color: this.props.color,
    };

    return (
      <div>
        {this.props.missing.value}
        {/* 존재하지 않는 props인 missing 객체의 value를 조회해서 렌더링하려고 함 -> 당연히 브라우저에서 에러 발생*/}
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {/* 부모 컴포넌트에서 props로 색상을 받음*/}
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSampleError;

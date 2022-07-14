import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  // 에러 발생 시 componentDidCatch 메서드가 호출됨 - 이 메서드는 this.state.error 값을 true로 업데이트해줌
  componentDidCatch(error, info) {
    this.setState({
      error: true,
    });
    console.log({ error, info });
  }
  render() {
    // this.state.error 값이 true라면 에러가 발생했음을 알려줌
    if (this.state.error) return <div>에러가 발생했습니다!</div>;
    return this.props.children;
  }
}

export default ErrorBoundary;

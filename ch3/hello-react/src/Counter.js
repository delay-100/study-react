import { Component } from 'react';

// 예시2 - Counter (number + 3)
class Counter extends Component {
  // constructor 메서드를 선언하지 않고 state 초기값을 설정하는 방법
  state = {
    number: 0,
    fixedNumber: 0,
  };

  render() {
    const { number, fixedNumber } = this.state; // state를 조회할 때는 this.state로 조회
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값: {fixedNumber}</h2>
        <button
          // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정합니다.
          // button안에 onClick이라는 값을 props로 넣어줌 => 이벤트 설정
          onClick={() => {
            // this.setState((prevState) => {
            //   // prevState: 기존 상태, props: 현재 지니고 있는 props(생략 가능)
            //   return {
            //     // 업데이트 하고 싶은 내용
            //     number: prevState.number + 1,
            //   };
            // });

            // // 위 코드와 아래 코드는 완전히 똑같은 기능을 합니다.
            // // 아래 코드는 함수에서 바로 "객체"를 반환한다는 의미입니다.
            // this.setState((prevState) => ({
            //   number: prevState.number + 1,
            // }));

            // setState를 사용해 값을 업데이트 한 후 특정 작업을 하고 싶은 경우 setState의 두 번째 파라미터로 콜백(callback) 함수를 등록하여 작업을 처리할 수 있음
            this.setState(
              {
                number: number + 1,
              },
              () => {
                console.log('방금 setState가 호출되었습니다.');
                console.log(this.state);
              }
            );
            // 화살표함수에서 값을 바로 반환하고 싶다면 {}를 생략하면 됨
            // ex) const sum = (a, b) => a + b;
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;

// // 예시1 - constructor 과 this.setState 사용하는 Counter (값 + 1)
// class Counter extends Component {
//   // 컴포넌트에 state를 설정할 때는 다음과 같이 constructor 메서드를 작성하여 설정함
//   // 컴포넌트 생성자 메서드
//   constructor(props) {
//     super(props); // 클래스형 컴포넌트에서 constructor를 작성할 때는 반드시 이 문장을 호출해야 함
//     // 함수 호출 시 현재 클래스형 컴포넌트가 상속받고 있는 리액트의 Component 클래스가 지닌 생성자 함수를 호출해줌
//     // this.state에 (state의) 초기값 설정하기, component의 state는 객체 형식이어야 함
//     this.state = {
//       number: 0,
//       fixedNumber: 0,
//     };
//   }

//   render() {
//     const { number, fixedNumber } = this.state; // state를 조회할 때는 this.state로 조회
//     return (
//       <div>
//         <h1>{number}</h1>
//         <h2>바뀌지 않는 값: {fixedNumber}</h2>
//         <button
//           // onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정합니다.
//           // button안에 onClick이라는 값을 props로 넣어줌 => 이벤트 설정
//           onClick={() => {
//             // this.setState를 사용하여 state에 새로운 값을 넣을 수 있습니다.
//             this.setState({ number: number + 1 }); // number 변수의 값만 1을 증가시켜줌
//           }}
//         >
//           +1
//         </button>
//       </div>
//     );
//   }
// }

// export default Counter;

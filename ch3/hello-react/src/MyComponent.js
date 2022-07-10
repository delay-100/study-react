import { Component } from 'react';
import PropTypes from 'prop-types';

// 클래스형 컴포넌트

class MyComponent extends Component {
  // 클래스형 컴포넌트에서는 class 내부에서 defaultProps와 propTypes 설정 가능
  static defaultProps = {
    name: '기본 이름',
  };
  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired,
  };

  render() {
    const { name, favoriteNumber, children } = this.props; // 비구조화 할당
    return (
      <div>
        안녕하세요, 제 이름은 {name}입니다. <br />
        children 값은 {children}
        입니다.
        <br />
        제가 좋아하는 숫자는 {favoriteNumber}입니다.
      </div>
    );
  }
}

// // 함수 컴포넌트
// const MyComponent = ({ name, favoriteNumber, children }) => {
//   return (
//     <div>
//       안녕하세요, 제 이름은 {name}입니다. <br />
//       children 값은 {children}
//       입니다.
//       <br />
//       제가 좋아하는 숫자는 {favoriteNumber}입니다.
//     </div>
//   );
// };

// MyComponent.defaultProps = {
//   name: "기본 이름",
// };

// // 함수, 클래스형 컴포넌트 사용 시 아래의 형태로 propTypes 사용 가능
// MyComponent.propTypes = {
//     name: PropTypes.string, // props의 타입 지정, 무조건 name 값이 문자열(string) 형태로 전달되어야 함
//     favoriteNumber: PropTypes.number.isRequired, // 필수 props 지정
// };

export default MyComponent;

// // props 사용한 Component 생성
// const MyComponent = (props) => {
//   return (
//     <div>
//       안녕하세요. 제 이름은 {props.name}입니다. <br />
//       children 값은 {props.children}
//       입니다.
//     </div>
//   );
// };

// /* src/App.js에 MyComponent에 name이 없는 경우 props.name에 아무것도 출력되지 않는데,
// 이 때 기본값을 주고 싶은 경우 defaultProps를 사용함 */
// MyComponent.defaultProps = {
//   name: "기본 이름",
// };

// export default MyComponent;

// // Component 생성
// const MyComponent = () => {
//   return <div>나의 새롭고 멋진 컴포넌트</div>;
// };

// export default MyComponent; // 모듈 내보내기, 다른 파일에서 이 파일을 import할 때, 위에서 선언한 MyComponent 클래스를 불러오도록 설정함

import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = ({ number, increase, decrease }) => {
  // mapStateToProps, mapDispatchProps에서 반환하는 객체 내부의 값들은 컴포넌트의 props로 전달됨
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

// mapStateToProps 함수: 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
const mapStateToProps = (state) => ({
  // state: 현재 스토어가 지니고 있는 상태
  number: state.counter.number,
});

// mapDispatchToProps 함수: 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
const mapDispatchToProps = (dispatch) => ({
  // store의 내장 함수인 dispatch를 받아옴
  increase: () => {
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
  //   // 임시 함수
  //   increase: () => {
  //     console.log('increase');
  //   },
  //   decrease: () => {
  //     console.log('decrease');
  //   },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
// connect 함수 호출 시 또 다른 함수를 반환함
// connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
// 반환된 함수에 컴포넌트를 파라미터로 넣어 주면 리덕스와 연동된 컴포넌트가 만들어짐
// 위의 코드는 아래처럼 풀어낼 수 있음
// const makeContainer = connect(mapStateToProps, mapDispatchToProps)
// makeContainer(타깃 컴포넌트)

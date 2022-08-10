// 2. 더더 간단하게 CounterContainer 만들기(CounterContainer2)
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer2 = ({ number, increase, decrease }) => {
  // mapStateToProps, mapDispatchProps에서 반환하는 객체 내부의 값들은 컴포넌트의 props로 전달됨
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        increase,
        decrease,
      },
      dispatch,
    ),
)(CounterContainer2);

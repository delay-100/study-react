// useSelector Hook을 사용한 CounterContainerHooks
// useSelector: connect 함수를 사용하지 않고도 리덕스의 상태 조회 가능
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number); // 1.  connect 함수 대신 useSelector을 사용해 counter.number 값을 조회

  // 2. useDispatch를 사용해 액션 디스패치하기
  const dispatch = useDispatch();
  // 3. useCallback을 사용해 액션을 디스패치하는 함수를 감싸줌
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter
      number={number}
      // onIncrease={() => dispatch(increase())} // 2. 숫자가 바뀌어서 컴포넌트가 리렌더링 될 때마다 onIncrease함수와 onDecrease 함수가 새롭게 만들어짐 -> 컴포넌트 성능 최적화 필요 시 useCallback 사용
      // onDecrease={() => dispatch(decrease())}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
    />
  ); //  connect 함수 대신 useSelector을 사용해 counter.number 값을 조회함으로써 Counter에게 Props를 넘겨줌
};

export default CounterContainer;

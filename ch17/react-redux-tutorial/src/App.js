// import Counter from './components/Counter';
import Todos from './components/Todos';
import CounterContainer from './containers/CounterContainer';

const App = () => {
  return (
    <div>
      {/* <Counter number={0} /> */}
      <CounterContainer /> {/* Counter을 CounterContainer로 교체 */}
      <hr />
      <Todos />
    </div>
  );
};

export default App;

// import Counter from './components/Counter';
// import Todos from './components/Todos';
import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';

const App = () => {
  return (
    <div>
      {/* <Counter number={0} /> */}
      <CounterContainer /> {/* Counter을 CounterContainer로 교체 */}
      <hr />
      {/* <Todos />  */}
      <TodosContainer /> {/* Todos를 TodosContainer로 교체 */}
    </div>
  );
};

export default App;

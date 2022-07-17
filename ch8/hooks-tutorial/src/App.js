import Counter from "./Counter";
// import Info from "./Info";
// import { useState } from "react";
// import InfoUseEffect from "./InfoUseEffect";
// import CounterUseReducer from "./CounterUseReducer";
// import InfoUseReducer from "./InfoUseReducer";
// import Average from "./Average";
// import AverageUseRef from "./AverageUseRef";
// import InfouseInputs from "./InfouseInputs";

const App = () => {
  return <Counter />;
  // return <Info />;
  // return <InfoUseEffect />;

  // // useEffect 적용 예4 - 뒷정리(cleanup) 함수 실행 시 아래의 주석을 풀어야 함
  // const [visible, setVisible] = useState(false);
  // return (
  //   <div>
  //     <button
  //       onClick={() => {
  //         setVisible(!visible);
  //       }}
  //     >
  //       {visible ? "숨기기" : "보이기"}
  //     </button>
  //     <hr />
  //     {visible && <InfoUseEffect />}
  //   </div>
  // );

  // return <CounterUseReducer />;
  // return <InfoUseReducer />;
  // return <Average />;
  // return <AverageUseCallback />;
  // return <AverageUseRef />;

  // return <InfouseInputs />;
};

export default App;

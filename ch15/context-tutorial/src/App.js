// import ColorBox from "./components/ColorBox";
// import ColorContext from "./contexts/color";

import DynamicColorBox from "./components/DynamicColorBox";
import { ColorProvider } from "./contexts/dynamiccolor";
import SelectColors from "./components/SelectColors";

const App = () => {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <DynamicColorBox />
      </div>
    </ColorProvider>
    // // 2-1 Context API 기본 사용 예제
    // <ColorContext.Provider value={{ color: "red" }}>
    //   {/*Provider 사용 시 Context의 value를 바꿀 수 있음. Provider을 사용한다면 value를 꼭 넣어줘야 함 -> 미기재시 에러 */}
    //   <div>
    //     <ColorBox />
    //   </div>
    // </ColorContext.Provider>
  );
};

export default App;

import { createContext, useState } from "react";

const ColorContext = createContext({
  // createContext의 기본값은 실제 Provider의 value에 넣는 객체의 형태와 일치시켜 주는 것이 좋음
  state: { color: "black", subcolor: "red" },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
}); // 새 Context를 만들 때는 createContext 함수를 사용. Context의 value에는 상태 값 뿐만아니라 함수를 전달할 수도 있음

// ColorProvider 컴포넌트
const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("black");
  const [subcolor, setSubcolor] = useState("red");

  const value = {
    // Provider의 value에는 상태는 state, 업데이트 함수는 actions로 묶어서 전달, 반드시 묶어줄 필요는 없지만 state와 actions 객체를 따로 분리해주면 나중에 다른 컴포넌트에서 Context 값 사용시 편리함
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

// const ColorConsumer = ColorContext.Consumer 와 같은 의미
const { Consumer: ColorConsumer } = ColorContext;

// ColorProvider와 ColorConsumer 내보내기
export { ColorProvider, ColorConsumer };

export default ColorContext;

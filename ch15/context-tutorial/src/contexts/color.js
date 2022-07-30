import { createContext } from "react";

const ColorContext = createContext({ color: "black" }); // 새 Context를 만들 때는 createContext 함수를 사용. 파라미터에는 Context의 기본 상태를 지정

export default ColorContext;

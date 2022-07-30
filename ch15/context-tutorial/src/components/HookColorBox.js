// HookColorBox 컴포넌트: ColorContext 안에 들어 있는 색상을 보여주는 컴포넌트
import { useContext } from "react";
import ColorContext from "../contexts/dynamiccolor";

const HookColorBox = () => {
  const { state } = useContext(ColorContext);
  return (
    <>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: state.color,
        }}
      />
      <div
        style={{
          width: "32px",
          height: "32px",
          background: state.subcolor,
        }}
      />
    </>
  );
};

export default HookColorBox;

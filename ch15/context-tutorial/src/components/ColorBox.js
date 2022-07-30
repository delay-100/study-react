// ColorBox 컴포넌트: ColorContext 안에 들어 있는 색상을 보여주는 컴포넌트
import ColorContext from "../contexts/color";

const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {/* Function as a child(Render Props): Consumer 사이에 중괄호를 열어서 그 안에 함수를 넣어 주는 것
      컴포넌트의 child가 있어야 할 자리에 일반 JSX 혹은 문자열이 아닌 함수를 전달하는 것*/}

      {(value) => (
        <div
          style={{
            width: "64px",
            height: "64px",
            background: value.color,
          }}
        />
      )}
    </ColorContext.Consumer>
  );
};

export default ColorBox;

import { Component } from "react";
import ColorContext from "../contexts/color";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

class SelectColors extends Component {
  static contextType = ColorContext; // this.context를 조회했을 때 현재 Context의 value를 가리키게 됨
  // 만약 setColor를 호출하고 싶다면 this.context.actions.setColor을 호출하면 됨

  handleSetColor = (color) => {
    this.context.actions.setColor(color);
  };
  handleSetSubcolor = (subcolor) => {
    this.context.actions.setSubcolor(subcolor);
  };
  render() {
    return (
      <div>
        <h2>색상을 선택하세요.</h2>
        {({ actions }) => (
          <div style={{ display: "flex" }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  background: color,
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
                onClick={() => this.handleSetColor(color)}
                onContextMenu={(e) => {
                  e.preventDefault(); // 마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것을 무시함
                  this.handleSetSubColor(color);
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SelectColors;

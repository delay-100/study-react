import styled, { css } from "styled-components";
// 단순 변수의 형태가 아니라 여러 줄의 스타일 구문을 조건부로 설정해야 하는 경우에는 css를 불러와야 합니다

// 반응형 디자인 함수화 하기 => styled-components 매뉴얼에서 제공하는 유틸 함수를 따라 사용
const sizes = {
  desktop: 1024,
  tablet: 768,
};

// 위에 있는 size 객체에 따라 자동으로 media 쿼리 함수를 만들어 줍니다.
// 참고: https://www.styled-components.com/docs/advanced#media-templates
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const Box = styled.div`
  /* props로 넣어 준 값을 직접 전달해 줄 수 있습니다. */
  background: ${(props) => props.color || "blue"};
  padding: 1rem;
  display: flex;
  ${media.desktop`width:768px`}
  ${media.tablet`width: 100%`};

  /* 반응형 디자인 */
  /* 기본적으로는 가로 크기 1024px에 가운데 정렬을 하고
  가로 크기가 작아짐에 따라 크기를 줄이고
  768px 미만이 되면 꽉 채웁니다 */
  /* width: 1024px;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  } */
`;

const Button = styled.button`
  // 스타일 작성 시 백틱을 사용해 만든 문자열에 스타일 정보를 넣어줌 => Tagged 템플릿 리터럴 문법임
  // styled.태그명 으로 구현함. styled.button 뒤에 Tagged 템플릿 리터럴 문법을 통해 스타일을 넣으면, 해당 스타일이 적용된 button으로 이루어진 리액트 컴포넌트가 생성됨.
  // 나중에 <Button>Hello</Button>으로 사용 가능
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* & 문자를 사용하여 Sass처럼 자기 자신 선택 가능*/
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  /* 다음 코드는 inverted 값이 true일 때 특정 스타일을 부여해 줍니다. */
  ${(props) =>
    props.inverted &&
    css`
      /* 스타일 코드 여러 줄을 props에 따라 넣어 주어야 할 때는 CSS를 styled-components에서 불러와야 합니다
        여기서 css+백틱이 아닌 그냥 백틱으로 바로 문자열을 넣어도 동작하기는 합니다. 
        css를 지우게 되면, VS Code 확장 프로그램에서 syntax 하이라이팅이 제대로 이루어지지 않는다는 단점이 있습니다.
        더욱 치명적인 단점은 Tagged 템플릿 리터럴이 아니기 때문에 함수를 받아 사용하지 못해 해당 부분에서는 props 값을 사용하지 못합니다.
        만약 조건부 스타일링을 할때 props를 참조하지 않는다면 굳이 CSS를 불러올 필요는 없습니다. */
      background: none;
      border: 2px solid white;
      color: white;

      &:hover {
        background: white;
        color: black;
      }
    `};
  & + button {
    margin-left: 1rem;
  }
`;

// 사용해야 할 태그명이 유동적이거나 특정 컴포넌트 자체에 스타일링 해주고 싶은 경우

// // 태그의 타입을 styled 함수의 인자로 전달
// const MyInput = styled("input")`
//   background: gray;
// `;

// // 특정 컴포넌트에 스타일링을 해주고 싶은 경우에는(컴포넌트를 styled의 파라미터에 넣는 경우)
// // 해당 컴포넌트에 className props를 최상위 DOM의 className 값으로 설정하는 작업이 내부적으로 되어있어야 함
// const Sample = ({ className }) => {
//   return <div className={className}>Sample</div>;
// };
// // 아예 컴포넌트 형식의 값을 넣어 줌
// const StyledLink = styled(Link)`
//   color: blue;
// `;

const StyledComponent = () => (
  <Box color="black">
    <Button>안녕하세요</Button>
    <Button inverted={true}>테두리만</Button>
  </Box>
);

export default StyledComponent;

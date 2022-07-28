// import styled, { css } from 'styled-components';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// categories 라는 배열 안에 name과 text 값이 들어가 있는 객체들을 넣어 주어서 한글로 된 카테고리와 실제 카테고리 값을 연결시켜줌
// name: 실제 카테고리 값, text: 렌더링할 때 사용할 한글 카테고리
const categories = [
  {
    name: 'all',
    text: '전체보기',
  },
  {
    name: 'business',
    text: '비즈니스',
  },
  {
    name: 'entertainment',
    text: '엔터테인먼트',
  },
  {
    name: 'health',
    text: '건강',
  },
  {
    name: 'science',
    text: '과학',
  },
  {
    name: 'sports',
    text: '스포츠',
  },
  {
    name: 'technology',
    text: '기술',
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

// NavLink을 이용해 선택된 카테고리에 다른 스타일을 주는 기능을 적용
const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }

  & + & {
    margin-left: 1rem;
  }
`;

// 기존의 Category style
// const Category = styled.div`
//   font-size: 1.125rem;
//   cursor: pointer;
//   white-space: pre;
//   text-decoration: none;
//   color: inherit;
//   padding-bottom: 0.25rem;

//   &:hover {
//     color: #495057;
//   }

//   // 선택된 카테고리 스타일 변경
//   ${(props) =>
//     props.active &&
//     css`
//       font-weight: 600;
//       border-bottom: 2px solid #22b8cf;
//       color: #22b8cf;
//       &:hover {
//         color: #3bc9db;
//       }
//     `}

//   & + & {
//     margin-left: 1rem;
//   }
// `;
const Categories = ({ onSelect, category }) => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
          to={c.name === 'all' ? '/' : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );

  // return 의 Category안에 있어야 하는 내용임
  //  NavLink로 만들어진 Category 컴포넌트에 to값은 "/카테고리이름" 으로 설정, 전체보기의 경우에는 "/all" 대신 "/"로 설정
  // 기존 코드
  //   active={category === c.name}
  //  onClick={() => onSelect(c.name)}
};

export default Categories;

// 헤더 컴포넌트를 만들기 전에 Responsive라는 컴포넌트를 작성. 반응형 디자인을 할 때 더 편하게 작업하기 위함

import styled from 'styled-components'

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
    margin: 0 auto; /* 중앙정렬 */

    /* 브라우저 크기에 따라 가로 크기 변경 */
    @media (max-width: 1024px) {
        width: 768px;
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`

const Responsive = ({children, ...rest }) => {
    ///style, className, onClick, onMouseMove 등의 props를 사용할 수 있도록 
    // ...rest를 사용하여 ResponsiveBlock에게 전달
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
}

export default Responsive

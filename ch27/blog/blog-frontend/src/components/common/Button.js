import styled, { css } from 'styled-components'

import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}

    // 버튼 비 활성화 시 스타일 지정
    &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`
const StyledButton = styled.button`
  ${buttonStyle}
`

const StyledLink = styled(Link)`
  ${buttonStyle}
`

const Button = (props) => {
  return props.to /* button 컴포넌트 내부에서 props.to 값에 따라 StyledLink를 사용할지, StyledButton을 사용할지 정하도록 설정 */ ? (
    <StyledLink
      {...props}
      cyan={props.cyan ? 1 : 0}
    /> /* props.cyan 값을 1과 0으로 해주었는데 위에서 styled() 함수로 StyledLink 컴포넌트를 만들었기 때문 -> styled() 함수로 감싸서 만든 컴포넌트는 임의 props 가 필터링되지 않음 -> 794p */
  ) : (
    <StyledButton {...props} />
  )
}

export default Button

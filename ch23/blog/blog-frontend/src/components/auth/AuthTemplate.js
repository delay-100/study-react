import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import { Link } from 'react-router-dom'

/**
 * 회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트
 */

const AuthTemplateBlock = styled.div`` // block은 컴포넌트의 최상위 컴포넌트 표현

const AuthTemplate = ({children}) => {
  return <AuthTemplateBlock>{children}</AuthTemplateBlock>
}

export default AuthTemplate

import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'

const SubInfoBlock = styled.div`
  ${(props) =>
    props.hasMarginTop && // hasMarginTop 값이 true면 상단 여백을 주고, 그렇지 않으면 여백이 없음 (PostViewer에는 있고 PostList에는 없음)
    css`
      margin-top: 1rem;
    `}
  color: ${palette.gray[6]};

  /* span 사이에 가운뎃점 문자 보여 주기 */
  span + span:before {
    color: ${palette.gray[4]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7'; /* 가운뎃점 문자 */
  }
`

const SubInfo = ({ username, publishedDate, hasMarginTop }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
          {/* Link: 계정명이 나타나는 부분에 사용해 클릭 시 이동할 주소를 설정해줌 */}
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  )
}

export default SubInfo

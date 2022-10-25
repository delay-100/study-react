import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import { Link } from 'react-router-dom'

const TagsBlock = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`

/* tags 컴포넌트: tags 값을 props 로 받아와서 태그 목록을 렌더링 해줌 */
const Tags = ({ tags }) => {
  return (
    <TagsBlock>
      {tags.map((tag) => (
        <Link className="tag" to={`/?tag=${tag}`} key={tag}>
          {/* 각 태그 항목을 Link 컴포넌트로 작성, 클릭 시 /?tag=태그 로 경로 설정 */}
          #{tag}
        </Link>
      ))}
    </TagsBlock>
  )
}

export default Tags

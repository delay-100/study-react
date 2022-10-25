import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import Responsive from '../common/Responsive'
import SubInfo from '../common/SubInfo'
import Tags from '../common/Tags'
import { Helmet } from 'react-helmet-async'

const PostViewerBlock = styled(Responsive)`
  margin-top: 4rem;
`

const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`

// const SubInfo = styled.div`
//   margin-top: 1rem;
//   color: ${palette.gray[6]};

//   /* span 사이에 가운뎃점 문자 보여주기 */
//   span + span:before {
//     color: ${palette.gray[5]};
//     padding-left: 0.25rem;
//     padding-right: 0.25rem;
//     content: '\\B7'; /* 가운뎃점 문자 */
//   }
// `

// const Tags = styled.div`
//   margin-top: 0.5rem;
//   .tag {
//     display: inline-block;
//     color: ${palette.cyan[7]};
//     text-decoration: none;
//     margin-right: 0.5rem;
//     &:hover {
//       color: ${palette.cyan};
//     }
//   }
// `

const PostContent = styled.div`
  font-size: 1.3124rem;
  color: ${palette.gray[8]};
`

const PostViewer = ({ post, loading, error, actionButtons }) => {
  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <PostViewerBlock> 존재하지 않는 포스트입니다.</PostViewerBlock>
    }
    return <PostViewerBlock>오류 발생!!</PostViewerBlock>
  }
  // 로딩 중이거나 직 포스트 데이터가 없을 때
  if (loading || !post) {
    return null
  }

  const { title, body, user, publishedDate, tags } = post

  return (
    <PostViewerBlock>
      <Helmet>
        <title>{title}-REACTERS</title>
      </Helmet>
      <PostHead>
        <h1>{title}</h1>
        <SubInfo
          username={user.username}
          publishedDate={publishedDate}
          hasMarginTop
        />
        {/* <SubInfo>
            <span>
              <b>{user.username}</b>
            </span>
            <span>{new Date(publishedDate).toLocaleDateString()}</span>
          </SubInfo> */}
        <Tags tags={tags} />
        {/* <Tags>
            {tags.map((tag) => (
              <div className="tag">#{tag}</div>
            ))}
          </Tags> */}
      </PostHead>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: body }} />
      {/* <PostContent
          dangerouslySetInnerHTML={{ __html: '<p>HTML <b>내용</b>입니다.</p>' }}
        /> */}
      {/* dangerousylSetInnerHTML: 리액트에서 html을 적용해주려면 이 dangerously어저구라는 props를 적용해줘야 함. 안해주면 html을 그대로 렌더링 할 수 x(ex. <div>{html}</div>같은 HTML을 그대로 렌더링하면 html태그가 적용이 안됨) */}
    </PostViewerBlock>
  )
}

export default PostViewer

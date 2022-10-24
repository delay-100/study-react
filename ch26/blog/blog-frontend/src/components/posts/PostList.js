import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Responsive from '../common/Responsive'
import Button from '../common/Button'
import palette from '../../lib/styles/palette'
import SubInfo from '../common/SubInfo'
import Tags from '../common/Tags'

const PostListBlock = styled(Responsive)`
  margin-top: 3rem;
`

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }
  p {
    margin-top: 2rem;
  }
`

// SubInfo, Tags 컴포넌트는 PostViewer에서 사용한 코드와 동일.(SubInfo 컴포넌트에 margin-top이 없는 것 제외 모두 동일)
// 이렇게 똑같은 코드(components/posts/PostViewer.js 에서도 사용)를 두 번 선언하는 대신에 common 디레토리에 SubInfo, Tags를 분리시켜 재사용 해보겟음
// const SubInfo = styled.div`
//   /* margin-top: 1rem; */
//   .tag {
//     display: inline-block;
//     color: ${palette.cyan[7]};
//     text-decoration: none;
//     margin-right: 0.5rem;
//     &:hover {
//       color: ${palette.cyan[6]};
//     }
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
//       color: ${palette.cyan[6]};
//     }
//   }
// `

const PostItem = ({ post }) => {
  const { publishedDate, user, tags, title, body, _id } = post
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        publishedDate={new Date(publishedDate)}
      />
      {/* <SubInfo>
        <span>
          <b>username</b>
        </span>
        <span>{new Date().toLocaleDateString()}</span>
      </SubInfo> */}
      <Tags tags={tags} />
      {/* <Tags>
        <div className="tag">#태그1</div>
        <div className="tag">#태그2</div>
      </Tags> */}
      <p>{body}</p>
      {/* <p>포스트 내용의 일부분..</p> */}
    </PostItemBlock>
  )
}

const PostList = ({ posts, loading, error, showWriteButton }) => {
  // 에러 발생 시
  if (error) {
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>
  }
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        {showWriteButton && (
          <Button cyan to="/write">
            새 글 작성하기
          </Button>
        )}
      </WritePostButtonWrapper>
      {/* 로딩 중이 아니고, 포스트 배열이 존재할 때만 보여 줌 */}
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
      )}
    </PostListBlock>
  )
}

export default PostList

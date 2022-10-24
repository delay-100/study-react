import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { readPost, unloadPost } from '../../modules/post'
import PostViewer from '../../components/post/PostViewer'

const PostViewerContainer = () => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { postId } = useParams() // react-router-dom이 v6이기 때문에 useNavigate 대신 사용중
  const dispatch = useDispatch()
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
  }))
  useEffect(() => {
    dispatch(readPost(postId))
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기: UNLOAD_POST 액션 실행
    return () => {
      dispatch(unloadPost())
    }
  }, [dispatch, postId])

  return <PostViewer post={post} loading={loading} error={error} />
}

// 컨테이너 컴포넌트를 만드는 과정에서 URL 파라미터로 받아 온 id 값을 조회해야 하기 때문에 withRouter도 함께 사용함
export default PostViewerContainer

import React, { useEffect } from 'react'
import WriteActionButtons from '../../components/write/WriteActionButtons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { writePost, updatePost } from '../../modules/write'

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title, body, tags, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    }),
  )

  // 포스트 등록
  // 포스트 등록 버튼을 누르면 현재 리덕스 스토어 안에 들어 있는 값을 사용하여 새 포스트를 작성
  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ title, body, tags, id: originalPostId }))
      return
    }
    dispatch(
      writePost({
        title,
        body,
        tags,
      }),
    )
  }

  // 취소
  // history 객체를 사용하여 취소 버튼을 누르면 브라우저에서 뒤로 가기를 하도록 만들음
  // 라우트가 아닌 컴포넌트에서 history 객체를 사용하기 위해 withRouter로 컴포넌트를 미리 감싸 준 다음에 컨테이너를 만들어 줌
  const onCancel = () => {
    navigate(-1)
  }

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    // 포스트 작성이 성공했을 때는 서버에서 응답한 포스트 정보의 _id와 username 값을 참조하여 포스트를 읽을 수 있는 경로를 만든 뒤, history.push를 사용하여 해당 경로로 이동함
    if (post) {
      const { _id, user } = post
      navigate(`/@${user.username}/${_id}`) // useNavigate - Link 컴포넌트를 사용하지 않고 다른 페이지로 이동해야 하는 상황에 사용하는 Hook
    }
    if (postError) {
      console.log(postError)
    }
  }, [navigate, post, postError])
  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!originalPostId}
    />
  )
}

export default WriteActionButtonsContainer

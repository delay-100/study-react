import React, { useRef, useEffect } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import Responsive from '../common/Responsive'

const EditorBlock = styled(Responsive)`
  /* 페이지 위 아래 여백 지정 */
  padding-top: 5rem;
  padding-bottom: 5rem;
`
const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[4]};
  margin-bottom: 2rem;
  width: 100%;
`
const QuillWrapper = styled.div`
  /* 최소 크기 지정 및 padding 제거 */
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0px;
  }
`

const Editor = ({ title, body, onChangeField }) => {
  const quillElement = useRef(null) // Quill을 적용할 DivElement를 설정
  const quillInstance = useRef(null) // Quill 인스턴스를 설정

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'bubble',
      placeholder: '내용을 작성하세요...',
      modules: {
        // 더 많은 옵션
        // https://quilljs.com/docs/modules/toolbar/ 참고
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    })

    // quill에 text-change 이벤트 핸들러 등록
    // 참고: https://quilljs.com/docs/api/#events
    const quill = quillInstance.current
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        onChangeField({ key: 'body', value: quill.root.innerHTML })
      }
    })
  }, [onChangeField])

  // post 수정 시 사용
  const mounted = useRef(false)
  // 값이 변경될 때마다 useEffect를 실행하는 것이 아닌,
  // 컴포넌트가 화면에 "마운트"되고 나서 단 한번만 useEffect에 등록한 작업이 실행되도록 설정해주어야 함
  // => useRef를 사용하여 mount 상태에 따라 작업을 처리하도록 설정함
  // useEffect 의 두 번재 파라미터에 비어있는 배열을 넣어도 되지만 ESLint 규칙은 useEffect에서 사용하는 모든 외부 값을 두 번째 파라미터에 넣는 배열 안에 포함시킬 것을 권장하므로 이 방법으로 처리함
  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    quillInstance.current.root.innerHTML = body
  }, [body])

  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value })
  }

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  )
}

export default Editor

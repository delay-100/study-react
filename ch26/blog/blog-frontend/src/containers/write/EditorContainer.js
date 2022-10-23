import {useEffect, useCallback} from 'react'
import Editor from '../../components/write/Editor'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, initialize } from '../../modules/write'

// 글을 작성하는 EditorContainer
const EditorContainer = () => {
    const dispatch = useDispatch()
    // title, body 값을 rdux-store에서 불러와 Editor(현재) 컴포넌트에 전달해줌
    const {title, body} = useSelector(({write}) => ({
        title: write.title,
        body: write.body,
    }))
    // useCallback으로 감싸준 이유 -> Editor 컴포넌트에서 사용할 useffect에서 onChangeField를 사용할 것이기 때문
    // onChangeField를 useCallback으로 감싸주어야만 나중에 Editor에서 사용할 useEffect가 컴포넌트가 화면에 나타났을 때 딱 한번만 실행되기 때문
    const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
        dispatch,
    ])
    // 언마운트될 때(사용자가 WritePage에서 벗어날 때) 데이터를 초기화 해야함(적용 안하면 페이지에 다시 돌아왔을 때 내용이 남아있게 됨)
    useEffect(() => {
        return () => {
            dispatch(initialize())
        }
    }, [dispatch])
    return <Editor onChangeField={onChangeField} title={title} body={body}/>
}

export default EditorContainer
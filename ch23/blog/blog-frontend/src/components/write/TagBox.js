import React, {useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'

const TagBoxBlock = styled.div`
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
    padding-top: 2rem;

    h4 {
        color: ${palette.gray[8]};
        margin-top: 0;
        margin-bottom: 0.5rem;
    }
`

const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;  
    width: 256px;
    border: 1px solid ${palette.gray[9]}; 
    /* background: ${palette.gray[8]}; */
    
    input, button {
        outline: none;
        border: none;
        font-size: 1rem;
    }

    input {
        border: none;
        padding: 0.5rem;
        flex: 1;
        min-width: 0;
    }
    button {
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        border: none; 
        background: ${palette.gray[8]};
        color: white;
        font-weight: bold;
        &:hover {
            background: ${palette.gray[6]};
        }
    }
`

const Tag = styled.div`
    margin-right: 0.5rem;
    color: ${palette.gray[6]};
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }
`

const TagListBlock = styled.div`
    display: flex;
    margin-top : 0.5rem;
`

// TagList와 TagItem 컴포넌트를 분리시켜주면 input 값이 바뀌어도 TagList 컴포넌트가 리렌더링 되지 않음
// 태그 목록에 변화가 생겨도 이미 렌더링중인 TagItem 들은 리렌더링되지 않고, 실제로 추가되거나 삭제되는 태그에만 영향을 미치게 됨
// 추가로 React.memo를 사용해 컴포넌트를 감싸주면 해당 컴포넌트가 받아오는 props가 실제로 바뀌었을 때만 리렌더링해

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({tag, onRemove}) => <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>)

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const TagList = React.memo(({tags, onRemove}) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag} tag={tag} onRemove={onRemove}/>
        )) }
    </TagListBlock>
))

const TagBox = ({tags, onChangeTags}) => {
    const [input, setInput] = useState('')
    const [localTags, setLocalTags] = useState([])

    const insertTag = useCallback(
        tag => {
            if (!tag) return; // 공백이라면 추가하지 않음
            if (localTags.includes(tag)) return; // 이미 존재하다면 추가하지 않음
            const nextTags = [...localTags, tag] // spread(...) 연산자로 배열에 항목 추가 
            setLocalTags(nextTags)
            onChangeTags(nextTags)
        },
        [localTags, onChangeTags], // localTags가 업데이트 될 때마다 실행
    )

    const onRemove = useCallback(
        tag => {
            const nextTags = localTags.filter(t => t !== tag)
            // setLocalTags를 호출해야 하는 상황에서 onChangeTags도 함께 호출
            // 또한 props로 받아온 tags 가 바뀔 때 setLocalTags를 호출함 (아래의 useEffect(()=> {블ㄹ바ㅡㄹ라},[tags]))
            // => TagBox 컴포넌트 내부에서 상태가 바뀌면리덕스 스토어에도 반영되고 리덕스 스토어에 있는 값이 바뀌면 TagBox 컴포넌트 내부의 상태도 바뀜
            setLocalTags(nextTags)
            onChangeTags(nextTags)
        },
        [localTags, onChangeTags],
    )
    const onChange = useCallback(e => {
        setInput(e.target.value)
    }, [])
    
    const onSubmit = useCallback(
        e => {
            e.preventDefault() // e.preventDefault는 고유 동작을 중단시킴(submit 금지)
            insertTag(input.trim()) // 앞뒤 공백을 없앤 후 등록
            setInput('') // input 초기화
        },
        [input, insertTag],
    )

    // tags 값이 바뀔 때
    useEffect(() => {
        setLocalTags(tags)
    }, [tags])

    return (
        <TagBoxBlock>
            <h4>태그</h4>
            <TagForm onSubmit={onSubmit}>
                <input placeholder='태그를 입력하세요' value={input} onChange={onChange}/>
                <button type="submit">추가</button>
            </TagForm>
            <TagList tags={localTags} onRemove={onRemove}/>
        </TagBoxBlock>
    )
}

export default TagBox
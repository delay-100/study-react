import React from 'react'
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
        /* border: none; */
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
const TagItem = React.memo(({tag}) => <Tag>#{tag}</Tag>)

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const TagList = React.memo(({tags}) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag} tag={tag}/>
        )) }
    </TagListBlock>
))

const TagBox = () => {
    return (
        <TagBoxBlock>
            <h4>태그</h4>
            <TagForm>
                <input placeholder='태그를 입력하세요'/>
                <button type="submit">추가</button>
            </TagForm>
            <TagList tags={['태그1', '태그2', '태그3']}/>
        </TagBoxBlock>
    )
}

export default TagBox
import styled from 'styled-components'
import Button from '../common/Button'

const WriteActionButtonsBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
/* button 끼리 붙어있을 때의 style */
    button + button {
        margin-left: 0.5rem;
    }
`

/* TagBox에서 사용하는 버튼과 일치하는 높이로 설정한 후 서로 간의 여백 지정*/
const StyledButton = styled(Button)`
    height: 2.125rem;
    & + & {
        margin-left: 0.5rem
    }
    /* // 아래의 코드와 동일함 &가 Button을 가리킴 
    Button + Button {
        margin-left: 0.5rem
    } */
`

const WriteActionButtons = ({onCancel, onPublish}) => {
    return (
        <WriteActionButtonsBlock>
            <StyledButton cyan onClick={onPublish}>
                포스트 등록
            </StyledButton>
            <StyledButton onClick={onCancel}>취소</StyledButton>
        </WriteActionButtonsBlock>
    )
}

export default WriteActionButtons
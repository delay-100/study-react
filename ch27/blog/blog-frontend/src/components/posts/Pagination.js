import styled from 'styled-components'
import qs from 'qs'
import Button from '../common/Button'

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`

const PageNumber = styled.div``

const buildLink = ({ username, tag, page }) => {
  const query = qs.stringify({ tag, page })
  return username ? `/@${username}?${query}` : `/?${query}`
}

// Pagination 컴포넌트
// props로 page(현재 페이지 숫자), lastPage(마지막 페이지 숫자), username(현재 선택된 계정명), tag(태그)를 가져옴
const Pagination = ({ page, lastPage, username, tag }) => {
  return (
    <PaginationBlock>
      {/* 사용자가 이 컴포넌트에 있는 버튼을 클릭하면 props로 받아 온 값을 사용하여 이동해야 할 다음 경로를 설정해줌 */}
      {/* 첫 번째 페이지일 경우 - 이전 버튼이 비활성화, 마지막 페이지일 경우 - 다음 버튼이 비활성화 됨 */}
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
      >
        다음
      </Button>
    </PaginationBlock>
  )
}

export default Pagination

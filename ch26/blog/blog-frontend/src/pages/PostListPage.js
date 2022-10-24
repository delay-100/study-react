// import Button from '../components/common/Button'
// import Header from '../components/common/Header'
import HeaderContainer from '../containers/common/HeaderContainer'
// import PostList from '../components/posts/PostList'
import PostListContainer from '../containers/posts/PostListContainer'
import PaginationContainer from '../containers/posts/PaginationContainer'

const PostListPage = () => {
  return (
    <div>
      {/* <Button>버튼</Button> */}
      {/* <Header/> */}
      <HeaderContainer />
      {/* <PostList /> */}
      <PostListContainer />
      <PaginationContainer />
    </div>
  )
}

export default PostListPage

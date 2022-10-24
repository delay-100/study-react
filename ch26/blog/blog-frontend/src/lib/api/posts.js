import client from './client'

// axios.get 함수에 두 번째 파라미터에 params를 설정하면 쿼리 값 설정을 더 편하게 할 수 있음
export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags })

// readPost 함수: lib/api/posts.js 파일을 열어서 포스트를 읽게 해주는 함수
export const readPost = (id) => client.get(`/api/posts/${id}`)

// listPosts API를 호출할 때 파라미터로 값을 넣어 주면 /api/posts/?username=tester&page=2와 같이 주소를 만들어 호출함
export const listPosts = ({ page, username, tag }) => {
  return client.get(`/api/posts`, {
    params: { page, username, tag },
  })
}

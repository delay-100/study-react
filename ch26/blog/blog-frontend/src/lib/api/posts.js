import client from './client'

export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags })

// readPost 함수: lib/api/posts.js 파일을 열어서 포스트를 읽게 해주는 함수
export const readPost = (id) => client.get(`/api/posts/${id}`)

import Post from '../../models/post'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params
  if (!ObjectId.isValid(id)) {
    ctx.status = 400
    return
  }
  return next()
}

export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body
  const post = new Post({
    title,
    body,
    tags,
  })
  try {
    await post.save()
    ctx.body = post
  } catch (e) {
    ctx.trhow(500, e)
  }
}

export const list = async (ctx) => {
  try {
    const posts = await Post.find().exec()
    ctx.body = posts
  } catch (e) {
    ctx.throw(500, e)
  }
}
// 특정 포스트 조회
export const read = async (ctx) => {
  const { id } = ctx.params
  try {
    const post = await Post.findById(id).exec()
    if (!post) {
      ctx.status = 404
      return
    }
    ctx.body = post
  } catch (e) {
    ctx.throw(500, e)
  }
}
export const remove = async (ctx) => {
  const { id } = ctx.params
  try {
    await Post.findByIdAndRemove(id).exec()
    ctx.status = 204
  } catch (e) {
    ctx.throw(500, e)
  }
}
export const update = async (ctx) => {
  const { id } = ctx.params
  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값 설정 시 업데이트 된 데이터를 반환
      // false일 때는 업데이트 되기 전의 데이터를 반환
    }).exec()
    if (!post) {
      ctx.status = 404
      return
    }
  } catch (e) {
    ctx.throw(500, e)
  }
}

// let postId = 1

// const posts = [
//   {
//     id: 1,
//     title: '제목',
//     body: '내용',
//   },
// ]

// /* 포스트 작성
// POST /api/posts
// {title, body}
// */

// export const write = (ctx) => {
//   const { title, body } = ctx.request.body
//   postId += 1
//   const post = { id: postId, title, body }
//   posts.push(post)
//   ctx.body = post
// }

// /* 포스트 목록 조회
// GET /api/posts
// */
// export const list = (ctx) => {
//   ctx.body = posts
// }

// /* 특정 포스트 조회
// GET /api/posts/:id
// */

// export const read = (ctx) => {
//   const { id } = ctx.params
//   const post = posts.find((p) => p.id.toString() === id)
//   if (!post) {
//     ctx.status = 404
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다.',
//     }
//     return
//   }
//   ctx.body = post
// }

// /* 특정 포스트 제거
// DELETE /api/posts/:id
//  */

// export const remove = (ctx) => {
//   const { id } = ctx.params
//   const index = posts.findIndex((p) => p.id.toString() === id)
//   if (index === -1) {
//     ctx.status = 404
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다',
//     }
//     return
//   }
//   posts.splice(index, 1)
//   ctx.status = 204
// }

// /* 포스트 수정(교체)
// PUT /api/posts/:id
// {title. body}
// */

// export const replace = (ctx) => {
//   const { id } = ctx.params
//   const index = posts.findIndex((p) => p.id.toString() === id)
//   if (index === -1) {
//     ctx.status = 404
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다',
//     }
//     return
//   }
//   posts[index] = {
//     id,
//     ...ctx.request.body,
//   }
//   ctx.body = posts[index]
// }

// /* 포스트 수정(특정 필드 변경)
// PATCH /api/posts/:id
// { title, body }
// */
// export const update = (ctx) => {
//   const { id } = ctx.params
//   const index = posts.findIndex((p) => p.id.toString() === id)
//   if (index === -1) {
//     ctx.status = 404
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다',
//     }
//     return
//   }
//   posts[index] = {
//     ...posts[index],
//     ...ctx.request.body,
//   }
//   ctx.body = posts[index]
// }

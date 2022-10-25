import Post from '../../models/post'
import mongoose from 'mongoose'
import Joi from 'joi'
import sanitizeHtml from 'sanitize-html'

const { ObjectId } = mongoose.Types

// sanitizeOption 객체: HTML을 필터링할 때 허용할 것을 설정
// 더 자세한 설정: https://www.npmjs.com/package/sanitize-html
const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
}

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params
  if (!ObjectId.isValid(id)) {
    ctx.status = 400
    return
  }
  try {
    const post = await Post.findById(id)
    if (!post) {
      ctx.status = 404
      return
    }
    ctx.state.post = post
    return next()
  } catch (e) {
    ctx.throw(500, e)
  }
}

// export const checkObjectId = (ctx, next) => {
//   const { id } = ctx.params
//   if (!ObjectId.isValid(id)) {
//     ctx.status = 400
//     return
//   }
//   return next()
// }

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403
    return
  }
  return next()
}

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열
  })

  const result = schema.validate(ctx.request.body)
  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }

  const { title, body, tags } = ctx.request.body
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption), // HTML의 특정 태그와 특정 속성만 허용할 수 잇음 -> sanitizeOptions 객체를 새로 만들어서 로 HTML 필터링함
    tags,
    user: ctx.state.user,
  })
  try {
    await post.save()
    ctx.body = post
  } catch (e) {
    ctx.trhow(500, e)
  }
}

// html을 없애고 내용이 너무 길면 200자로 제한하는 함수
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  })
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`
}

/*
  GET /api/posts?username=&tag=&page=
*/
export const list = async (ctx) => {
  // query는 문자열이기 때문에 숫자로 변환해줘야 함
  // 값이 주어지지 않았다면 1을 기본으로 사용
  const page = parseInt(ctx.query.page || '1', 10)

  if (page < 1) {
    ctx.status = 400
    return
  }

  const { tag, username } = ctx.query
  // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  }
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec()
    const postCount = await Post.countDocuments(query).exec()
    ctx.set('Last-Page', Math.ceil(postCount / 10))
    // ctx.body = posts
    //   .map((post) => post.toJSON())
    //   .map((post) => ({
    //     ...post,
    //     body:
    //       post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`, // body 길이가 200 이상이면 뒤에 '...'을 붙이고 문자열을 자르는 기능
    //   }))
    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body), // html을 제거하고 문자열 길이를 200자로 제한하는 함수를 호출
      // post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`, // 문자열 길이만 제한
    }))
  } catch (e) {
    ctx.throw(500, e)
  }
}
// 특정 포스트 조회
export const read = async (ctx) => {
  ctx.body = ctx.state.post
  // const { id } = ctx.params
  // try {
  //   const post = await Post.findById(id).exec()
  //   if (!post) {
  //     ctx.status = 404
  //     return
  //   }
  //   ctx.body = post
  // } catch (e) {
  //   ctx.throw(500, e)
  // }
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

/*
  PATCH /api/posts/:id
  {
    title: '수정',
    body: '수정 내용',
    tags: ['수정', '태그']
  }
*/
export const update = async (ctx) => {
  const { id } = ctx.params

  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()), // 문자열로 이루어진 배열
  })

  const result = schema.validate(ctx.request.body)
  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }

  const nextData = { ...ctx.request.body } //객체를 복사하고
  // body 값이 주어졌으면 HTML필터링
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption)
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
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

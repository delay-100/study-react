import Router from 'koa-router'
import * as postsCtrl from './posts.ctrl'

const posts = new Router()

posts.get('/', postsCtrl.list)
posts.post('/', postsCtrl.write)
posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read)
posts.delete('/id', postsCtrl.checkObjectId, postsCtrl.remove)
posts.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update)

// 라우터 분리하기
// const post = new Router()

// post.get('/', postsCtrl.checkObjectId, postsCtrl.read)
// post.delete('/', postsCtrl.checkObjectId, postsCtrl.remove)
// post.patch('/', postsCtrl.checkObjectId, postsCtrl.update)

// posts.use('/:id', postsCtrl.checkObjectId, post.routes())

// -----------
// posts.put('/:id', postsCtrl.replace)

// module.exports = posts
export default posts

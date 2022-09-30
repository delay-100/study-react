import Router from 'koa-router'
import * as postsCtrl from './posts.ctrl'
import checkLoggedIn from '../../lib/checkLoggedIn'
const posts = new Router()

posts.get('/', postsCtrl.list)
posts.post('/', checkLoggedIn, postsCtrl.write)

// posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read)
// posts.delete('/:id', checkLoggedIn, postsCtrl.checkObjectId, postsCtrl.remove)
// posts.patch('/:id', checkLoggedIn, postsCtrl.checkObjectId, postsCtrl.update)

// 라우터 분리하기
const post = new Router() // /api/posts/:id

post.get('/', postsCtrl.read)
post.delete('/', postsCtrl.checkOwnPost, postsCtrl.remove)
post.patch('/', postsCtrl.checkOwnPost, postsCtrl.update)

posts.use('/:id', postsCtrl.getPostById, post.routes())
// posts.use('/:id', postsCtrl.checkObjectId, post.routes())

// -----------
// posts.put('/:id', postsCtrl.replace)

// module.exports = posts
export default posts

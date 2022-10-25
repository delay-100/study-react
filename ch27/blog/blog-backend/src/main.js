require('dotenv').config()
// const Koa = require('koa')
// const Router = require('koa-router')
// const bodyParser = require('koa-bodyparser')
// const mongoose = require('mongoose')
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'
import serve from 'koa-static'
import path from 'path'
import send from 'koa-send'

import api from './api'
import jwtMiddleware from './lib/jwtMiddleware'
// import createFakeData from './createFakeData'

// const api = require('./api')

const { PORT, MONGO_URI } = process.env

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    // createFakeData()
  })
  .catch((e) => {
    console.error(e)
  })

const app = new Koa()
const router = new Router()

router.use('/api', api.routes())

// 라우터 전에 bodyparser 적용
app.use(bodyParser())
app.use(jwtMiddleware)

router.get('/', (ctx) => {
  ctx.body = '홈'
})

router.get('/about', (ctx) => {
  ctx.body = '소개'
})

router.get('/about/:name?', (ctx) => {
  const { name } = ctx.params
  ctx.body = name ? `${name}의 소개` : '소개'
})

router.get('/posts', (ctx) => {
  const { id } = ctx.query
  ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.'
})

// app 인스터스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build')
// koa-staticㅇ을 사용하여 blog-frontend/build 디렉터리에 있는 파일들을 서버를 통해 조회할 수 있게 해줌
app.use(serve(buildDirectory))

// send를 사용하는 미들웨어  -클라이언트 기반 라우팅이 제대로 작동하게 해줌
// 이 미들웨어를 적용하지 않으면 http://localhost:4000/write 페이지를 브라우저 주소창에 직접 입력하여 들어갈 경우 페이지가 제대로 나타나지 않고 Not Found가 나타남
app.use(async (ctx) => {
  // HTTP 상태가 404(Not Found)이고, 주소가 /api로 시작하지 않는 경우
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    //index.html 내용을 반환
    await send(ctx, 'index.html', { root: buildDirectory })
  }
})

const port = PORT || 4000
app.listen(port, () => {
  console.log('Listening to port %d', port)
})

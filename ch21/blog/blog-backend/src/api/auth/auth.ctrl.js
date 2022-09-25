import Joi from 'joi'
import User from '../../models/user'

/*
    POST /api/auth/register
    {
        username: 'velopert',
        password: 'mypass123'
    }
*/

export const register = async (ctx) => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  })
  const result = schema.validate(ctx.request.body)
  if (result.error) {
    ctx.status = 400
    ctx.body = result.error
    return
  }
  const { username, password } = ctx.request.body

  try {
    // username이 이미 존재하는지 확인(중복허용 x)
    const exists = await User.findByUsername(username)
    if (exists) {
      ctx.status = 409 // conflict
      return
    }
    const user = new User({
      username,
    })

    await user.setPassword(password)
    await user.save()

    // hashedPassword 필드가 응답되지 않도록 데이터를 JSON으로 변환 후
    // delete를 통해 응답할 데이터에서 hashedPassword 필드 제거
    // const data = user.toJSON()
    // delete data.hashedPassword
    // 위의 코드를 user의 인스턴스 메서드로 만들어서 아래처럼 호출함
    ctx.body = user.serialize()
  } catch (e) {
    ctx.throw(500, e)
  }
}

export const login = async (ctx) => {
  const { username, password } = ctx.request.body

  if (!username || !password) {
    ctx.status = 401
    return
  }

  try {
    const user = await User.findByUsername(username)
    if (!user) {
      ctx.status = 401
      return
    }
    const valid = await user.checkPassword(password)
    if (!valid) {
      ctx.status = 401
      return
    }
    ctx.body = user.serialize()
  } catch (e) {
    ctx.throw(500, e)
  }
}

export const check = async (ctx) => {}

export const logout = async (ctx) => {}

import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
})

UserSchema.methods.serialize = function () {
  const data = this.toJSON()
  delete data.hashedPassword
  return data
}

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10)
  this.hashedPassword = hash
}

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword) // 화살표함수가 아닌 function으로 구현(함수 내부에서 this(문서 인스턴스)에 접근해야해서)
  return result // true, false
}

UserSchema.statics.findByUsername = function (username) {
  // this는 모델, statics는 User을 가리킴
  return this.findOne({ username })
}

const User = mongoose.model('User', UserSchema)
export default User

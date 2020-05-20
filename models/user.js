const mongoose = require('mongoose');
//userSchema 对数据输入时的规定
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  psw: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
  },
  identity: {
    type: String,
  }
});
//创建模型,用于处理  登录以及注册时与数据库比较信息,
module.exports = mongoose.model( "user",userSchema );
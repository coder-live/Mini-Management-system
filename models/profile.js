const mongoose = require('mongoose');
//userSchema 对数据输入时的规定
const profileSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  descript: {
    type: String,
  },
  income: {
    type: String,
    required: true
  },
  paid: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
});
//创建模型,用于处理  登录以及注册时与数据库比较信息,
module.exports = mongoose.model( "profile",profileSchema );
const express = require('express');
const app = new express();
//mongoose 数据
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const url = require('./config/keys').mongourl;
//引入passport 结合passport-jwt
const passport = require('passport');
//引入 passport-jwt
const passportJwt = require('./config/passportJwt');
// 端口引用
let port = process.env.PORT || 5001;



//mongoose连接
mongoose.connect(url).then( () => {
  console.log('链接成功');
} ).catch( (err) => {
  console.log(err);
} )

//设置passport
app.use(passport.initialize());
//执行passport-jwt ,传参passport
passportJwt(passport);

//设置body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get( '/', ( req,res )=>{
  res.send('首页');
} );
//设置路由
app.use( '/api/user', user );
app.use( '/api/profile', profile );

app.listen( port,() => {
  console.log(port);
} );
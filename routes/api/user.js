const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
//引入对象,实例化
const User = require('../../models/user');
//引入token
const jwt = require('jsonwebtoken');
const passport = require('passport');
//引入 秘钥
const key = require('../../config/keys').privateKey;

router.get( '/',
//passport.authenticate('jwt', { session: false }),
(req,res)=>{
  User.find().then(user=>{
    res.json(user);
  }).catch(err=>res.status(404).json('没有人员信息'));
} );
//实现注册
router.post('/register',(req,res)=>{
  //console.log(req.body);
  User.findOne({email:req.body.email})
  .then(user=>{
    if(user){
      return res.status(200).json('repeat')
    }else{
      //默认头像
      //let avatar = gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: '404'});
      let avatar = req.body.avatar || gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: '404'});
      //console.log(req.body.avatar,avatar)
      //实例化对象  => 生成新的用户
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        psw: req.body.psw,
        date: req.body.date,
        avatar,
        identity: req.body.identity,
      });
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.psw, salt, function(err, hash) {
          if (err) throw err;
          //将加密值hash赋值
          newUser.psw = hash;
          //保持至数据库 将user抛出去
          newUser.save().then(user=>{
            //console.log(user)
            //res.json(user);
          }).catch((err)=>{
            console.log(err);
          });
        });
    });
    }
  })
  
});
router.post('/login',(req,res)=>{
  let email = req.body.email;
  let psw = req.body.psw;
  User.findOne({email})
  .then(user=>{
    //console.log(user);
    if(!user){
      //邮箱错误
      //console.log(2);
      return res.status(400).json('邮箱错误');
    } 
    //需要先进行密码对照  =>加密结合token
    bcrypt.compare(psw,user.psw).then( isMatch => {
      if ( !isMatch ){
        //console.log(3);
        return res.status(400).json('密码错误');
      }
      let rule = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        identity: user.identity
      };
      //密码正确 => 进行token操作  配置jwt
      // 规则, 秘钥, 对象(包括有效时间), 回调函数
      jwt.sign( rule,key,{expiresIn: 60 * 60},(err, token)=>{
        //console.log(rule);
        if(err) throw err;
        res.json({
          success: true,
          token: "Bearer " + token
        });
      } );
    });
    
  });

});
router.get('/current', 
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    //console.log(req.user);
    User.find().then( user => {
      res.json(user);
    } )
  }
);
// router.post( "/delete",
//   passport.authenticate('jwt', { session: false }),
//   ( req,res ) => {
//     let name = req.body.name;
//     //console.log(req.body);
//     User.findOneAndRemove( {name} ).then( user=>{
//       user.save().then(user=>{
//         res.json(user);
//       })
//     } ).catch( err=> res.status(404).json('删除失败') );
//   }
// )

module.exports = router;
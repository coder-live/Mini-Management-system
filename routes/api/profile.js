const express = require('express');
const router = express.Router();
//引入对象,实例化
const Profile = require('../../models/profile');
//引入token
const passport = require('passport');
//引入 秘钥

router.post("/add",
  passport.authenticate('jwt', { session: false }),
  ( req,res )=>{
    //let profileDate = {};
    //console.log(req.body);
    new Profile(req.body).save().then(profile=>{
      res.json(profile);
    });
    //res.json(req.body)
  }
);
router.get( '/', 
  passport.authenticate('jwt', { session: false }),
  ( req,res ) => {
    Profile.find().then( profile=>{
      if(!profile) { return res.status(404).json('找不到数据') };
      res.json(profile);
    } ).catch( err=> res.json(err) );
  }
);
router.post( '/edit/:id', 
  passport.authenticate('jwt', { session: false }),
  ( req,res ) => {
    let _id = req.params.id;
    //console.log(req.body);
    Profile.findOneAndUpdate( {_id},{$set:req.body},{new:true} )
    .then( profile=>{
      res.json(profile);
    } ).catch( err=>res.json('修改失败') );
  }
);
router.delete( "/delete/:id",
  passport.authenticate('jwt', { session: false }),
  ( req,res ) => {
    let _id = req.params.id;
    //console.log(req.body);
    Profile.findByIdAndRemove( {_id} ).then( profile=>{
      profile.save().then(profile=>{
        res.json(profile);
      })
    } ).catch( err=> res.status(404).json('删除失败') );
  }
)

module.exports = router;
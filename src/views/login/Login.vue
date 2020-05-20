<template>
  <div id= "login">
    <h3>我是登录页面</h3>
    <el-form :model="loginForm" status-icon 
    :rules="rules" 
    ref="loginForm" label-width="100px" 
    class="login">
       <el-form-item label="邮箱" prop="email">
        <el-input v-model="loginForm.email" placeholder="请输入邮箱" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="psw">
        <el-input type="password" v-model="loginForm.psw" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!--<el-select  placeholder="请选择身份"><el-optionv-for="item in ruleForm.identity":key="item":value= "item"></el-option></el-select>-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
      <h4>没有账号就去 <router-link to="/register">注册</router-link> 吧 </h4>
    </el-form>
  </div>

</template>

<script>
import {request} from '@/network/request';
import jwtDecode from 'jwt-decode';

export default {
  name: 'register',
  data() {
    return {
      loginForm: {
        email: '',
        psw: '',
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: "email", message: '邮箱格式不正确', trigger: ['blur', 'change']},
        ],
        psw: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在6至18个字符'},
        ],
      }
    };

  },
  methods: {
    submitForm(formName) {
      //console.log(request)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request({
            method: "post",
            url: '/api/user/login',
            data: this.loginForm
          }).then( 
            (res)=>{
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              const { token } = res.data;
              const hasToken = token ? true : false;
              //解密token
              const decode = jwtDecode(token);
              //异步改变vuex状态
              //console.log(hasToken,decode);
              this.$store.dispatch( 'setHasAuthority', hasToken );
              this.$store.dispatch( 'setItem', decode );

              localStorage.setItem( 'token', token );
              this.$router.push('/index');
              return //console.log('请求成功',res);
            }
          ).catch(error=>{
            this.$message({
              message: '登录失败',
              type: 'error'
            });
            console.log("请求失败",error);
            return 
          })
          //console.log(this.$axios)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  component: {}
}
</script>

<style scoped>
  #login {
    max-width: 540px;
    margin: 50px auto;
    overflow: hidden;
    text-align: center;
    background-color: #ff0;
  }
  #login h3 {
    margin: 20px 0;
  }
  #login .login {
    width: 85%;
  }
  #login h4 {
    position: relative;
    top: -8px;
    text-align: right;
  }
</style>
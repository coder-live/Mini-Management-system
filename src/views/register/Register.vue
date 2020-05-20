<template>
  <div id= "register">
    <h3>我是注册页面</h3>
    <el-form :model="ruleForm" status-icon 
    :rules="rules" 
    ref="ruleForm" label-width="100px" 
    class="registerForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="psw">
        <el-input type="password" v-model="ruleForm.psw" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码"></el-input>
      </el-form-item>
      <!--<el-select  placeholder="请选择身份"><el-optionv-for="item in ruleForm.identity":key="item":value= "item"></el-option></el-select>-->
      <el-form-item label="身份" label-width="250px" prop="identity">
        <el-select v-model="ruleForm.identity" placeholder="请选择身份">
          <el-option label="管理员" value="manager"></el-option>
          <el-option label="普通员工" value="ordinary"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
      <h4>有账号就去 <router-link to="/login">登录</router-link> 吧 </h4>
    </el-form>
  </div>

</template>

<script>
import {request} from '@/network/request';

export default {
  name: 'register',
  data() {
    let password2 = (rule, value, callback) => {
      if (value !== this.ruleForm.psw) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        email: '',
        psw: '',
        checkPass: '',
        identity: ""
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在2至18个字符'},
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: "email", message: '邮箱格式不正确', trigger: ['blur', 'change']},
        ],
        psw: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在6至18个字符'},
        ],
        checkPass: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在6至18个字符', trigger: 'blur'},
          { validator: password2, trigger: ['blur', 'change'] }
        ],
        identity: [ {required: true, message: '请选身份', trigger: 'change'} ]
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
            url: '/api/user/register',
            data: this.ruleForm
          }).then( 
            (res)=>{
              if(res.data == 'repeat' ) {
                this.$message({
                  message: '邮箱已注册'
                });
                return
              }         
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              this.$router.push('/login');
              return console.log('请求成功',res);
            }
          ).catch(error=>{
            this.$message({
              message: '注册失败',
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
  #register {
    max-width: 540px;
    margin: 50px auto;
    overflow: hidden;
    text-align: center;
    background-color: #ff0;
  }
  #register h4 {
    position: relative;
    top: -8px;
    text-align: right;
  }
  #register h3 {
    margin: 20px 0;
  }
  #register .registerForm {
    width: 85%;
  }
</style>
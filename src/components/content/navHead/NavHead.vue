<template>
  <div id= "nav-list">
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <span class= "title">后台管理系统</span>
      </el-col>
      <el-col :span="6">
        <div class="user">
          <div class="img"><img :src="user.avatar" alt=""></div>
          <div class="infoText">
            <div class="welcome">欢迎</div>
            <div class="name">{{user.name}}</div>
          </div>
          <div class="btn">
            <el-dropdown trigger="click" @command="clickCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="user">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'navHead',
  methods: {
    clickCommand( msg ) {
      if( msg === 'user' ) {
        this.$router.push('/index/userInfo')
      }else{
        window.localStorage.removeItem('token');
        this.$store.dispatch( 'clearAuthority' );
        this.$router.replace('/login');
        //console.log(2)
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  }
}
</script>

<style scoped>
  #nav-list {
    height: 64px;
    padding: 0 15px;
    line-height: 64px;
    background-color: #314059;
    color: #fff;
  }
  #nav-list .title {
    font-size: 20px;
  }
  #nav-list .user {
    float: right;
  }
  .img,.infoText,.btn{
    display: inline-block;
    margin: 0 7px;
  }
  #nav-list .user .img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
  }
  .user .img img {
    width: 100%;
    height: 100%;
  }
  #nav-list .user .infoText {
    text-align: center;
    line-height: 32px;
  } 
  #nav-list .user .btn {
    vertical-align: middle;
    text-align: center;
  }
  .el-dropdown {
    top: -20px;
  }
</style>
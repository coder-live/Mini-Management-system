<template>
  <div class= 'userInfo'>
    <div class="avatar">
      <div class="img"><img :src="user.avatar" alt=""></div>
    </div>
    <div class="msg">
      <div class="user-name">{{user.name}}</div>
      <div class="user-level">
      <i class= "el-icon-user-solid"></i>
        {{userLevel}}</div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'userInfo',
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userLevel() {
      return this.$store.getters.user.identity == 'manager' ? '管理员' : '普通员工';
    }
  }
}
</script>

<style scoped>
  .userInfo {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .avatar {
    flex: 1;
  }
  .avatar .img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: auto;
    overflow: hidden;
  }
  .img img {
    width: 100%;
    height: 100%;
  }
  .msg {
    width: 100%;
    height: 100%;
    flex: 3;
    font-size: 20px;
    background-color: #eee;
  }
  .msg .user-name,.user-level {
    margin-top: 150px;
    text-align: center;
  }
</style>
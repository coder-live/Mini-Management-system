<template>
  <div id= "home">
    <div class="wel">欢迎来到后台管理系统</div>
    <div class="des">你好  !!!</div>
  </div>

</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
  #home { 
    width: 100%;
    height: 100%;
    color: #fff;
    background: url('../../../assets/images/bgc.png') no-repeat;
    background-size: cover;
    overflow: hidden;
  }
  #home .wel,.des {
    width: 80%;
    height: 50px;
    line-height: 50px;
    font-size: 22px;
    text-align: center;
    margin: 100px auto 50px;
  }
</style>
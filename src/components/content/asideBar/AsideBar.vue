<template>
  <div class= "aside-head">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      router
      text-color="#fff">
      <el-menu-item index="/index/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu v-for= "(item,index) in navItem" :key= "index" :index="String(index+1)">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
      <el-menu-item v-for= "oItem in item.sonName" :key= "oItem.path" :index="oItem.path">{{oItem.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>

</template>

<script>
export default {
  name: 'aside-head',
  data() {
    return {
      navItem: [
        {
          icon: 'el-icon-wallet',
          name: '资金管理',
          sonName: [
            {name: '资金明细', path: '/index/fundList'},
          ]
        },{
          icon: 'el-icon-s-tools',
          name: '信息管理',
          sonName: [
            {name: '人员信息', path: '/index/userInfo'}
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
  .aside-head {
    position: absolute;
    top: 64px;
    left: 0;
    width: 150px;
    height: calc( 100% - 54px );
    border: 0;
    background-color: rgb(84, 92, 100);
  }
  .el-menu {
    border: 0;
  }
  .el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
    min-width: 0;
  }
</style>
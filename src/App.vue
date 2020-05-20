<template>
  <div id="app">
    <div class="box">
      <router-view/>
    </div>
  </div>
</template>
<script>
  import jwtDecode from 'jwt-decode';

  export default {
    name: 'app',
    created() {
      const token = window.localStorage.token;
      if( token ) {
        const hasToken = token ? true : false;
        //解密token
        const decode = jwtDecode(token);
        //异步改变vuex状态
        //console.log(hasToken,decode);
        this.$store.dispatch( 'setHasAuthority', hasToken );
        this.$store.dispatch( 'setItem', decode );
      }
    }
  }

</script>
<style>
* {
  margin: 0;
  padding: 0;
}
html,body {
  height: 100%;
}
#app {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 750px;
}
#app .box {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class= "index">
    <NavHead/>
    <AsideBar/>
    <div class="view">
      <router-view/>
    </div>
  </div>

</template>

<script>
import NavHead from '@/components/content/navHead/NavHead';
import AsideBar from '@/components/content/asideBar/AsideBar';
export default {
  name: 'index',
  components: {
    NavHead,
    AsideBar
  }
}
</script>

<style scoped>
  .index {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .view {
    position: relative;
    top: 0;
    left: 150px;
    width: calc( 100% - 150px );
    height: calc( 100% - 64px );
    overflow: auto;
  }
</style>
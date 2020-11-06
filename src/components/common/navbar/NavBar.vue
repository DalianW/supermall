<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot class="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar',
    props: {
      
    }
  }
</script>

<style scoped>
  .nav-bar{
    height: 44px;
    align-items: center;
    line-height: 44px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .left,.right{
    height: 100%;
    width:60px;
  }
  .center{
    height: 100%;
    flex:1;
  }
</style>
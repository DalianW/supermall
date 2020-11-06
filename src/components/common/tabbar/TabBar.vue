<template>
  <div id="tab-bar">
    <slot></slot>
    
  </div>
</template>

<script>
  export default {
    name: 'TabBar'
  }
</script>

<style scoped>
 #tab-bar{
  display: flex;
  height: 49px;
  align-items: center;
  justify-content: space-between;
  background:#f6f6f6;
  position:fixed;
  left:0;
  bottom:0;
  right:0;
  box-shadow: 0 -1px 5px rgba(0,0,0,0.1);
}

</style>
<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods: {
      
    }
  }
</script>

<style scoped>
.back-top{
  position: fixed;
  z-index: 998;
  width: 50px;
  height: 50px;
  right:5px;
  bottom:58px;
}
.back-top img{
  display: block;
  width: 100%;
  height: 100%;
}

</style>
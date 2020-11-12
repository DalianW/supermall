<template>
  <div class="check-button" :class="{checked: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
.check-button{
  background:#fff;
  border:2px solid #ccc;
  border-radius: 50%;
  width:100%;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.check-button.checked{
   background:#f00;
   border-color:#f00;
}
</style>
<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = '弹出提示', duration = 2000) {
        this.message = message
        this.isShow = true
        setTimeout(() => {
          this.isShow = false
        }, duration)
      },
      aa() {
        return '1111'
      }
    }
  }
</script>

<style scoped>
.toast{
  position: fixed;
  z-index:9999;
  left:50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding:9px 15px;
  background:rgba(0,0,0,.7);
  color:#fff;
  border-radius: 5px;
  font-size:14px;
}
</style>
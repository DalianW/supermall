<template>
  <div class="cart-list">

    <scroll class="content-box" ref="scroll">
      <cart-list-item v-for="item in cartList" :key="item.iid" :product="item"></cart-list-item>
    </scroll>
    
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  import {mapGetters} from 'vuex'
  export default {
    name: 'cart-list',
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
.cart-list{
  height: calc(100% - 133px);
  overflow: hidden;
}
.content-box{
  height: 100%;
}
</style>
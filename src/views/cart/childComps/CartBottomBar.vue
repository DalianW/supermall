<template>
  <div class="cart-bottom-bar">
    <div class="left all-select" @click="checkClick">
       <CheckButton class="check-button" :is-checked=" isSelectAll"/>
      <span>全选</span>
    </div>

    <div>
      合计： {{totalPrice}}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
    
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'
  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    props: {

    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '¥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
      },
      checkLength() {
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        // return !this.cartList.filter( item => !item.checked).length
        if(this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll){
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
.cart-bottom-bar{
  position: relative;
  z-index:900;
  height: 40px;;
  background:#e5e5e5;
  font-size:14px;
  padding:0 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.all-select{
  display: flex;
  align-items: center;
  
  height: 100%;
  
}

.check-button{
  width: 20px;
  height: 20px;
  margin-right:8px;
}
.calculate{
   background:#f60;
   height: 100%;
   line-height: 40px;
   font-size:16px;
   color:#fff;
   padding:0 20px;
}
</style>
<template>
  <div class="cart-list-item" id="shop-item">
    <!-- <div class="item-selector">
      <check-buttton @checkBtnClick="checkedChange" :value="product.checked"></check-buttton>
    </div> -->
    <div class="item-selector">
      <CheckButton :is-checked="product.checked" @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="" >
    </div>

    <div class="item-info">
      <div class="item-title">
        {{product.title}}
      </div>
      <div class="item-desc">
        {{product.desc}}
      </div>
      
      <div class="info-bottom">
        <div class="item-price left">¥{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
    name: 'CartListItem',
    components: {
      CheckButton
    },
    props: {
      product: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked;
      }
    }
  }
</script>

<style scoped>
.cart-list-item{
  width: 100%;
  display: flex;
  padding: 10px;
  border-bottom:1px solid #ccc;
}
.item-selector{
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title,.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
  position: absolute;
  width: 100%;
}
.item-img{
  padding: 5px;
  width: 80px;
  height: 100px;
  flex-shrink:0;
}
.item-img img{
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 5px;
}
.item-info{
  flex: 1;
  font-size: 16px;
  color:#777;
  padding: 5px 10px;
  position: relative;
}
.item-info .item-title{
  width: 100%;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  top: 35px;
}
.info-bottom{
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price {
  color: orangered;
}
</style>
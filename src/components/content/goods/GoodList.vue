<template>
  <div class="goods">
   
    <good-item v-for="item in goods" :key="item.link" :goodsItem="item"/>
 
  </div>
</template>

<script>
  import GoodItem from './GoodItem'
  export default {
    name: 'GoodList',
    components: {
      GoodItem
    },
    props: {
      goods: {
        type: Array,
        default: () => []
      }
      
    }
  }
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  padding:10px;
}
</style>
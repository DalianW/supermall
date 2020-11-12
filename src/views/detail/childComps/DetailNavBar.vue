<template>
  <div class="detail-nav-bar">


    <nav-bar>

      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>

      <div slot="center" class="title">
        <div v-for="(item, index) in titles" 
        :key="item" 
        class="item" 
        :class="{active: index == currentIndex}" 
        @click="itemClick(index)">
          {{item}}
        </div>
      </div>

      <div slot="right"></div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar,
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    justify-content: space-between;
  }
  .title .item{
    flex:1;
    font-size:14px;
    text-align: center;
  }
  .active{
    color:var(--color-high-text);
    font-weight: bold;
  }
  .back{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 20px;
  }
</style>
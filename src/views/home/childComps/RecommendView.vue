<template>
  <div class="recommed">
    <div v-for="item in recommends" :key="item.sort" class="recommed-item">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title">
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped>
.recommed{
  display: flex;
  justify-content: space-between;
  text-align: center;
  width:100%;
  padding:20px 8px;
  border-bottom:5px solid #f5f5f5;
}
.recommed-item{
  flex:1;
}
.recommed-item a{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.recommed-item img{
  width: 70%;
  display: block;
}
.recommed-item .title{
  font-size:14px;
  margin-top:8px;
}
</style>
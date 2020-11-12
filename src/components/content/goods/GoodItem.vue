<template>
  <div class="good-item" @click="itemClick(goodsItem.iid)">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="text">
      <p class="title">{{goodsItem.title}}</p>
      <p class="bottom">
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodItem',
    props: {
      goodsItem: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImgLoad')
      },
      itemClick(id) {
        this.$router.push('/detail/' + id)
      }
    }
  }
</script>

<style scoped>
.good-item{
  width: 50%;
  padding:0 10px 10px 10px;
}
.good-item a{
  display: block;
}
.good-item img{
  display: block;
  width: 100%;
}
.good-item .text{
  text-align: center;
  padding:10px 5px;
  font-size: 14px;
}
.good-item .text .title{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom:6px;
}
.good-item .text .price{
  margin-right:28px;
  color:var(--color-tint);
}

.good-item .text .collect{
  position: relative;
}
.good-item .text .collect:after{
  content: ' ';
  position: absolute;
  left: -15px;
  top:1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
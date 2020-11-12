<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: 'HomeSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isLoad: false
      }
    },
    props: {
      banners: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      imageLoad() {
        if(!this.isLoad){
          this.$emit('swiperImgLoad')
          this.isLoad = true
        }
        
      }
    }

  }
</script>

<style scoped>

</style>
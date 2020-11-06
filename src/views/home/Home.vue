<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends = "recommends"></recommend-view>
    <feature-view></feature-view>

    <tab-control class="tab-control" :types="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>

    <good-list :goods="showGoods"></good-list>
  </div>
</template>

<script>
  // 页面内组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar'
  // 项目公共组件
  import GoodList from 'components/content/goods/GoodList'
  import TabControl from 'components/content/tabControl/TabControl'
  // 方法
  import { getHomeMultidata, getHomeGoods } from 'network/home.js'
  
  export default {
    name: 'Home',
    components: {
      // 页面内组件
      HomeSwiper,
      RecommendView,
      FeatureView,
      // 公共组件
      NavBar,
      TabControl,
      // 项目公共组件
      GoodList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goodsList: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop'
      }
    },
    created() {
      
      this.getHomeMultidata()
      this.getHomeGoods('pop')     
      this.getHomeGoods('new')     
      this.getHomeGoods('sell')     
    },
    computed: {
      showGoods() {
        return this.goodsList[this.currentType].list
      }
    },
    methods: {

      /**
       * 事件监听相关方法
       */
      // 产品切换
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      },

      /**
       * 网络请求相关方法
       */

      // 1、请求banner
      getHomeMultidata() {      
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      // 2、请求商品
      getHomeGoods(type) {
        const page = ++ this.goodsList[type].page
        getHomeGoods(type, page).then( res => {
          this.goodsList[type].list.push(...res.data.list)
          this.goodsList[type].page ++ 
        })
      },
    }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background: var(--color-tint);
    color:#fff;
    position:fixed;
    left:0;
    right:0;
    top:0;
    z-index:99;
  }
  .tab-control{
    position: sticky;
    top: 44px;
  }
</style>
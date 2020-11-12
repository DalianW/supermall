<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>

    <tab-control 
        v-show="isTabFixed"
        ref="tabControl1" 
        class="tab-control" 
        :types="['流行', '新款', '精选']" 
        @tabClick="tabClick" 
        ></tab-control>

    <scroll 
      class="scroll-box" 
      ref="scroll" 
      :probe-type="3" 
      @contentScroll="contentScroll" 
      :pull-up-load="true"  
      @pullingup="pullingup">

      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends = "recommends"></recommend-view>
      <feature-view></feature-view>

      <tab-control 
        ref="tabControl2" 
        class="tab-control" 
        :types="['流行', '新款', '精选']" 
        @tabClick="tabClick" 
        v-show="!isTabFixed"
        ></tab-control>

      <good-list :goods="showGoods"></good-list>
    </scroll>
    
    <back-top 
      @click.native="backClick" 
      v-show="isShowBtnTop"></back-top>

  </div>
</template>

<script>
  // 页面内组件
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  // 项目公共组件
  import GoodList from 'components/content/goods/GoodList'
  import TabControl from 'components/content/tabControl/TabControl'

  // 方法
  import { getHomeMultidata, getHomeGoods } from 'network/home.js'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  
  export default {
    name: 'Home',
    components: {
      // 页面内组件
      HomeSwiper,
      RecommendView,
      FeatureView,
      // 公共组件
      NavBar,
      Scroll,
      // 项目公共组件
      TabControl,
      GoodList
    },
    mixins:[itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goodsList: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    created() {
      
      this.getHomeMultidata()
      this.getHomeGoods('pop')     
      this.getHomeGoods('new')     
      this.getHomeGoods('sell')  
    },
    mounted() {
      
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
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index

      },
      
      // 监听滚动
      contentScroll(option) {
       
       this.listenshowBackTop(option)

        // 监听吸顶效果
        this.isTabFixed = (-1 * option.y) > this.tabOffsetTop
      },
      // 下拉加载更多
      pullingup() {
        this.getHomeGoods(this.currentType)     
      },
      // 获取tab距离顶部高度
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
          this.$refs.scroll.finishPullUp()
        })
      },
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 取消全局监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
  }
  .home-nav{
    background: var(--color-tint);
    color:#fff;
    position: relative;
    z-index:99;
  }
  
  .tab-control{
    position: relative;
    z-index: 20;
  }
  .scroll-box{
    overflow: hidden;
    height: calc(100% - 93px);
  }
</style>
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" 
      ref="scroll" 
      @contentScroll="contentScroll" 
      :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo"  ref="comment"></detail-comment-info>
      <good-list :goods="recommends"  ref="recommends"></good-list>
      
    </scroll>

    <back-top 
      @click.native="backClick" 
      v-show="isShowBtnTop"></back-top>

    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo' 
  import DetailBottomBar from './childComps/DetailBottomBar'
  
  import GoodList from 'components/content/goods/GoodList'
  import Scroll from 'components/common/scroll/Scroll'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {debounce} from 'common/utils'
  import {mapActions} from 'vuex'
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodList,
      Scroll
    },
    mixins:[itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        message: '弹出内容',
        isShow: false
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // 1.获取顶部的图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取评论样式
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

      })

      // 3、请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      // 4、给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      })
    },
    methods: {
      ...mapActions(['addCart']),
      addToCart() {
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        
        // 将商品添加到购物车中
        // this.$store.dispatch('addCart', product).then( res => {
        //   console.log(res)
        // })
        this.addCart(product).then( res => {
          this.$toast.show(res, 1500)
        })
      },
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -1 * this.themeTopYs[index], 300)
      },
      contentScroll(position) {
        this.listenshowBackTop(position)
        const positionY = -position.y 
        for(let i = 0; i < this.themeTopYs.length; i++){
          if(this.currentIndex !== i && ((i < this.themeTopYs.length - 1 && positionY < this.themeTopYs[i + 1] && positionY >= this.themeTopYs[i]) || i == this.themeTopYs.length - 1 && positionY >= this.themeTopYs[i])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }

        }

      }
    },
    mounted() {
      
    },
    updated() {
      
    },
    destroyed() {
      // 取消全局监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 901;
    background-color: #fff;
  }

  .content {
    overflow: hidden;
    height: calc(100% - 93px);
    position: relative;
    z-index: 99;
    background:#fff;
  }
</style>

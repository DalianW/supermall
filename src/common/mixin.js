import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null   
    }
  },
  mounted() {
    // 监听item图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 0)

    // 对监听的事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBtnTop: false,
    }
  },
  methods: {
    // 返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenshowBackTop(option) {
       // 监听返回顶部按钮的显示隐藏
       this.isShowBtnTop = (-1 * option.y) > 1000
    }
  }
}
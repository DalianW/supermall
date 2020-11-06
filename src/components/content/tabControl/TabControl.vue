<template>
  <div class="tab-control">
    <div v-for="(item, index) in types" :key="item" :class="{active: index == currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      types: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
.tab-control{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:#fff;
}
.tab-control>div{
  text-align: center;
  flex:1;
  height: 40px;
  line-height: 40px;
  font-size:16px;
}
.active span{
  font-weight: bold;
  padding: 5px;
  color: var(--color-high-text);
  border-bottom: 2px solid var(--color-tint);
}
</style>
<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i classs="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
    import {formatDate} from 'common/utils'
  export default {
    name: 'DetailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default: () => {}
      }
    },
    filters: {
      showDate(val) {
        return formatDate(val)
      }
    }
  }
</script>

<style scoped>
  .comment-info{
    padding:25px 20px;
    
  }
  .comment-info .info-header{
    display: flex;
    padding:10px 0;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #e9e9e9;
  }
  .header-title{
    font-size:16px;
    font-weight: bold;
  }
  .header-more{
    font-size:12px;
    color:#999;
  }
  .comment-info .info-user{
    display: flex;
    align-items: center;
    padding-top:20px;
  }
  .comment-info .info-user img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right:15px;
  }
  .comment-info .info-detail{
    margin-top:10px;
  }
  .comment-info .info-detail p{
    line-height: 1.6;
    font-size:14px;
  }
  .comment-info .info-detail .info-other{
    font-size:12px;
    color:#999;
    margin-top:5px;
  }
  .comment-info .info-detail .info-other span{
    margin-right: 10px;
  }
  .comment-info .info-detail .info-imgs{
    display: flex;
    flex-wrap: wrap;
  }
  .comment-info .info-detail .info-imgs img{
    display: block;
    width: 23%;
    height: auto;
    margin-right:2%;
    margin-top: 6px;
    border-radius: 3px;
  }
  .comment-info .info-detail .info-imgs img:nth-child(4n){
    margin-right: 0;
  }
</style>
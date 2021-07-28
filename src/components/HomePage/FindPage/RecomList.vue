<template>
  <div class="recomListContainer">
    <!-- 在用户登录后显示该每日歌曲推荐 -->
    <div class="itemList" v-show="hasLogin">
      <router-link tag="div" :to="{name: 'playlist' ,params:{listId: 0}}">
        <div class="imgBox">
          <el-image :src="dayRecom"  style="filter:blur(2px)"></el-image>
          <i class="iconfont calIcon">&#xe606;</i>
          <div class="day">{{day}}</div>
        </div>
        <div class="listTitle">每日歌曲推荐</div>
      </router-link>
    </div>
    
    <div
    class="itemList"
    v-for="item in recomList"
    :key="item.listId"
    >
      <router-link
      tag="div" 
      :to="{name: 'playlist' ,params:{listId:item.listId}}">
        <div class="imgBox">
          <el-image :src="item.picUrl" lazy></el-image>
          <div class="playCountBox">
            <i class="iconfont">&#xed2e;</i>
            <div class="playCount">{{item.playCount | changeView}}</div>
          </div>
        </div>
        <div class="listTitle">{{item.listName}}</div>
      </router-link>
    </div>

  </div>
</template>
<script>
import { changePlaycount } from '@/module/changePlaycount.js'
// 引入图片
import img from "@/static/dayRecom.jpg"
export default {
  data () {
    return {
      recomList: this.$store.state.home.recomList,
      // 每日推荐封面图片
      dayRecom: img,
      // 今天日期
      day: new Date().getDate()
    }
  },
  mounted () {
    if (this.$store.state.home.recomList.length === 0) {
      if (localStorage.getItem('userId')) { // 如果用户已经登录
        this.$store.dispatch('getRecomList')
      } else { // 用户没有登录
        this.$store.dispatch('getRecomListNL')
      }
    }
  },
  computed: {
    hasLogin: function () {
      return this.$store.state.login.userInfo.hasLogin
    }
  },
  watch: {
    hasLogin: function (newV) {
      if (newV) {
        this.$store.dispatch('getRecomList')
      }
    }
  },
  filters: {
    changeView: function (playCount) {
      return changePlaycount(playCount)
    }
  }
}
</script>
<style lang="scss" scoped>
.recomListContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .itemList {
    width: 210px;
    height: auto;
    cursor: pointer;
    margin: 0px {
      top: 5px;
      left: 55px;
    }

    .imgBox {
      width: 210px;
      height: 210px;
      position: relative;
      & > .el-image {
        position: absolute;
        width: 210px;
        height: 210px;
        border-radius: 5px;
      }
      & > .playCountBox {
        position: absolute;
        width: 100%;
        height: 16px;
        line-height: 16px;
        top: 0px;
        color: #e7e7e7;
        font-size: 12px;
        background-image: linear-gradient(to bottom, #000000aa, #02020200);
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        text-align: end;
        & > .playCount {
          display: inline-block;
          padding-right: 5px;
        }
      }
    }

    .listTitle {
      width: 100%;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      -moz-box-orient: vertical;
      font-size: 12px;
      line-height: 20px;
      margin-top: 5px;
    }
  }
}
.calIcon {
  position: absolute;
  font-size: 150px;
  color: #eeeeee;
  top: 50%;
  margin-top: -75px;
  left: 50%;
  margin-left: -75px;
}
.day {
  position: absolute;
  width: 100%;
  text-align: center;
  color: #eeeeee;
  font-size: 50px;
  top: 50%;
}
</style>

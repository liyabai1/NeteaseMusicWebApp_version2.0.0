<template>
  <div class="MvContainer">
    <div 
    class="itemBox"
    v-for="item in mvList"
    :key="item.MvId">
      <router-link 
      tag="div"
      :to="{ name: 'mvDetail', params: {MvId: item.MvId, type: item.type}}">
        <div class="itemContent">
          <el-image
          :src="item.picUrl"
          style="width:313px;height:176px" lazy></el-image>
          <div class="playCountBox">
            <i class="iconfont">&#xed2e;</i>
            <span>{{item.playCount | changeView}}</span>
          </div>
          <div class="title">{{item.title}}</div>
          <div class="artistName">{{item.artistName}}</div>
        </div>
      </router-link>
    </div>
    <!-- 加载中 -->
    <slot></slot>
  </div>
</template>
<script>
import { changePlaycount } from '@/module/changePlaycount.js'
export default {
  props:{
    mvList: Array
  },
  filters: {
    changeView: function (playCount) {
      return changePlaycount(playCount)
    }
  }
}
</script>
<style lang="scss" scoped>
.MvContainer {
  width: 1100px;
  display: flex;
  flex-wrap: wrap;
  .itemBox {
    width: 366.6px;
    height: 220px;
    margin-bottom: 20px;
    .itemContent {
      width: 313px;
      height: 220px;
      margin: auto;
      position: relative;
      font-size: 12px;
      cursor: pointer;
      .el-image {
        border-radius: 5px;
      }
      .playCountBox {
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
        & > span {
          padding-right: 5px;
        }
      }
      .title {
        width: 100%;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 20px;
        margin-top: 5px;
      }
      .artistName {
        color: #8f8f8f;
      }
    }
  }
}
</style>
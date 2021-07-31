<template>
  <div>
    <div
    class="listItem"
    v-for="(item,index) in listData"
    :key="item.songId">
      <span class="index">{{index+1}}</span>
      <span class="picUrl">
        <el-image
        :src="item.picUrl"
        lazy
        style="width: 60px;height:60px"></el-image>
      </span>
      <span class="songName" :class="{needVIP: item.fee !== 0 && item.fee !== 8}">{{item.songName}}</span>
      <span class="vip">
        <i 
        class="iconfont" 
        style="color: red;"
        v-show="item.fee !== 0 && item.fee !== 8">&#xe60f;</i>
      </span>
      <span class="singer">{{item.singer}}</span>
      <span class="album">{{item.album}}</span>
      <span class="songTime">{{item.songTime/1000 | changeTimeView}}</span>
    </div>
  </div>
</template>
<script>
import { changeTimeToMinute } from "@/module/fun.js"
export default {
  props: {
    listData: Array
  },
  methods: {
    // vip: function (fee) {
    //   return (fee !== 0 && fee !== 8)
    // }
  },
  filters: {
    changeTimeView: function (time) {
      return changeTimeToMinute(time)
    }
  }
}
</script>
<style lang="scss" scoped>
.listItem {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &:nth-child(odd) {
    background: #efefef;
  }
  &:hover {
    background-color: #d4d4d4;
  }
  & > span {
    display: inline-block;
    height: 60px;
    font-size: 15px;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .index {
    width: 60px;
    text-align: end;
    padding-right: 10px;
  }
  .picUrl {
    width: 60px;
    border-radius: 5px;
    overflow: hidden;
  }
  .songName {
    width: 430px;
  }
  .vip {
    width: 30px;
  }
  .singer {
    width: 180px;
    color: #b8b8b8;
  }
  .album {
    width: 200px;
    color: #b8b8b8;
  }
  .songTime {
    width: 100px;
    text-align: center;
    color: #b8b8b8;
  }
}
.needVIP {
  color: #b8b8b8;
}
</style>
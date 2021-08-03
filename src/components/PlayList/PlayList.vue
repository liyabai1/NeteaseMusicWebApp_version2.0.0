<template>
  <div class="songListContainer">
    <div>
      <div class="title">
        <span class="index"></span>
        <span class="songname">音乐标题</span>
        <span class="singer">歌手</span>
        <span class="album">专辑</span>
        <span class="time">时长</span>
      </div>
      <div
      class="listContent"
      v-for="(item,index) in songData"
      :key="item.songId">
        <span class="index">
          <div v-if="true">{{++index}}</div>
          <i v-else class="iconfont">&#xe61f;</i>
        </span>
        <span class="songname" style="display: flex;">
          <span>{{item.songName}}</span>
          <i class="iconfont" v-show="item.fee !== 0 && item.fee !== 8">&#xe60f;</i>
        </span>
        <span class="singer">{{item.singer}}</span>
        <span class="album">{{item.album}}</span>
        <span class="time">{{item.songTime/1000 | changeTimeView()}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { changeTimeToMinute } from '@/module/fun.js'
export default {
  data () {
    return {}
  },
  props: {
    songData: Array
  },
  mounted () {
    // console.log("传入数据：",this.songData)
  },
  filters: {
    changeTimeView: function (time) {
      return changeTimeToMinute(time)
    }
  }
}
</script>
<style lang="scss" scoped>
.songListContainer {
  width: 100%;
  .title,
  .listContent {
    height: 35px;
    display: flex;
    width: 100%;
    min-width: 1100px;
    cursor: pointer;
    // justify-content: space-between;
    & > span {
      display: inline-block;
      height: 35px;
      line-height: 35px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:nth-of-type(odd) {
      background: #efefef;
    }
    &:hover {
      background-color: #d4d4d4;
    }
  }
}
.index {
  width: toRem(50px);
  min-width: 50px;
  text-align: center;
  color: #b8b8b8;
}
.songname {
  width: toRem(300px);
  min-width: 300px;
  align-items: center;
  span {
    display: inline-block;
    max-width: toRem(250px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
  }
  i {
    display: inline-block;
    color: red;
  }
}
.singer {
  width: toRem(150px);
  min-width: 150px;
  color: #b8b8b8;
}
.album {
  width: toRem(120px);
  color: #b8b8b8;
  min-width: 120px;
}
.time {
  width: toRem(60px);
  min-width: 60px;
  color: #b8b8b8;
  text-align: center;
}
</style>

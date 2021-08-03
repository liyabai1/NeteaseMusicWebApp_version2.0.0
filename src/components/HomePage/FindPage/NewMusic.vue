<template>
  <div class="newMusicContainer">
    <div
    class="itemBox"
    v-for="item in newMusic"
    :key="item.songId">
      <div class="itemContent">
        <i class="iconfont">&#xe6ba;</i>
        <el-image
        :src="item.picUrl"
        style="width:60px;height:60px"
        lazy></el-image>
        <div class="content">
          <div class="songName">{{item.songName}}</div>
          <div class="singer">{{item.singer}}</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  props: {
    newMusic: Array
  },
  mounted () {
    // console.log('传入的最新音乐数据', this.newMusic)
  }
}
</script>
<style lang="scss" scoped>
.newMusicContainer {
  display: flex;
  flex-wrap: wrap;
  .itemBox {
    width: (1100px/3);
    height: 60px;
    margin-bottom: 5px;
    .itemContent {
      width: 350px;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        background-color: #d1d1d1;
      }
      & > i {
        position: absolute;
        font-size: 30px;
        top: 50%;
        margin-top: -15px;
        left: 15px;
        color: rgba(241, 0, 0, 0.644);
        z-index: 1;
      }
      .el-image {
        border-radius: 5px;
      }
      .content {
        width: 350px - 60px;
        height: 50px;
        & > div {
          width: 100%;
          height: 25px;
          line-height: 25px;
          font-size: 13px;
          padding-left: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .songName {
          color: black;
        }
        .singer {
          color: #7c7c7c;
        }
      }
    }
  }
}
</style>

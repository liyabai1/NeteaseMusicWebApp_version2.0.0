<template>
<!-- 播放组件点击专辑封面后向上弹出的播放页面 -->
  <div class="songPlayBox">
    <div class="title">
      <p class="songName">{{musicInfo.songName}}</p>
      <p class="singer">{{musicInfo.singer}}</p>
    </div>
    <lrc 
    :key="musicInfo.id"
    :lyric="lrcData"
    style="width: 550px;height: 600px;"></lrc>
  </div>
</template>
<script>
import lrc from '@/components/lrc'
export default {
  data(){
    return {
      lrcData: []
    }
  },
  components: {
    lrc
  },
  mounted(){
    // 获取歌词
    
  },
  computed: {
    musicInfo: function () {
      return this.$store.state.musicInfo
    }
  }
}
</script>
<style lang="scss" scoped>
.songPlayBox {
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    #525252ff,
    #d4d4d4,
    #ffffff,
    #ffffff
  );
  .title {
    width: 1100px;
    margin: auto;
    padding-top: 20px;
    text-align: center;
    .songName {
      width: 100%;
      height: 50px;
      font-size: 25px;
      font-weight: bolder;
    }
    .singer {
      font-size: 20px;
      color: #aaaaaa;
    }
  }
}
</style>
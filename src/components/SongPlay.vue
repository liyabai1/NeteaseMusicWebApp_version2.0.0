<template>
<!-- 播放组件点击专辑封面后向上弹出的播放页面 -->
  <div class="songPlayBox">
    <div class="title">
      <p class="songName">{{musicInfo.songName}}</p>
      <p class="singer">{{musicInfo.singer}}</p>
    </div>
    <lrc 
    :key="musicInfo.id"
    style="width: 550px;height: 600px;"></lrc>
    <comment
    style="margin:auto;"
    :id="this.$store.state.musicInfo.id"
    :type='0'></comment>
  </div>
</template>
<script>
import lrc from '@/components/lrc'
import comment from '@/components/comment'
export default {
  data(){
    return {
      
    }
  },
  components: {
    lrc,
    comment
  },
  mounted(){
    this.$store.dispatch('getLyric')
  },
  computed: {
    musicInfo: function () {
      return this.$store.state.musicInfo
    },
    // 歌词信息
    lrcData: function () {
      return this.$store.state.lyric
    }
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
.songPlayBox {
  height: 100%;
  overflow: auto;
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
<template>
  <div class="lrcContainer">
    <div class="scroll" ref="lrcBox">
      <p
      :class="'lrc_'+index"
      v-for="(item,index) in lrcArr"
      :key="item.time">{{item.ctx}}</p>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  data(){
    return {
      lrcArr: [{time:"",ctx:0}]
    }
  },
  props: {
    // lyric: [String]
  },
  mounted () {
    console.log("刷新",this.lrcArr)
    this.viewLrc(this.lyric)
    this.BS = new BScroll('.lrcContainer',{
          probeType: 3,
          click: true,
          mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300,
          },
          scrollbar: true,
        })
        console.log(this.BS)
    this.musicplayer.ontimeupdate = this.goLrc
  },
  methods: {
    // 显示歌词
    viewLrc: function (lrc) {
      this.lrcArr = this.toLrcArr(lrc)

    },
    goLrc: function () {
      // 获取音乐的时间
      let currentTime = this.musicplayer.currentTime;
      let lrcS = this.$refs.lrcBox.children
        // 样式
        lrcS.forEach(item => {
          item.style.fontWeight= "normal";
          item.style.color = "#4c4c4c";
        })
        // 获取所有已经播放的歌词
        console.log()
        let playedLrc = this.lrcArr.filter(item => currentTime*1000 >= item.time )
        let index = playedLrc.length
        if (index >= 1) {
          lrcS[index - 1].style.fontWeight = "bolder";
          lrcS[index - 1].style.color = "#000000"
          this.BS.scrollToElement(
            lrcS[index - 1],
            300,
            true,
            true,
            undefined
          );
        }
    },
    // 转字符串歌词为数组形式
    toLrcArr: function(lrc) {
      let reg = /\[\d{2,}:\d{2,}.\d{2,}\]/g
      let tiemArr = lrc.match(reg)
      let ctxArr = lrc.split(reg).splice(1)
      tiemArr = tiemArr.map( item => {
        let reg = /(?!=\])\d{2,}:\d{2,}.\d{2,}(?!=\])/g
        let time = item.match(reg)[0]
        let min = time.split(":")[0]
        let sec = time.split(":")[1]
        let ms = ((Number(min)*60 + Number(sec))*1000).toFixed(0)
        return ms
      })
      let lrcArr = tiemArr.map( (item,index)=>{
        return {
          time: item,
          ctx: ctxArr[index]
        }
      })
      return lrcArr
    }
  },
  computed: {
    musicplayer: function () {
      return this.$store.state.musicplayer
    },
    lyric: function () {
      return this.$store.state.lyric
    }
  },
  watch: {
    lyric: function (newV) {
      newV && this.viewLrc(newV)
    }
  }
}
</script>
<style lang="scss" scoped>
.lrcContainer {
  margin: auto;
  margin-top: 10px;
  height: 100%;
  overflow: hidden;
  position: relative; /* 控制滚动条，必须 */
  .scroll {
    & > p {
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
      font-weight: normal;
    }
  }
}
</style>
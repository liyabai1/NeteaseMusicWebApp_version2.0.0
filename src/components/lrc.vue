<template>
  <div class="lrcContainer">
    <div class="scroll" ref="lrcBox">
      <p
      :class="'lrc_'+index"
      v-for="(item,index) in lrcArr"
      :key="item.hex">{{item.ctx}}</p>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { EventBus } from '@/util/bus.js'
export default {
  data(){
    return {
      // lrcArr: [{time:0,ctx:""}]
      BS: null,
      timer: null
    }
  },
  props: {
    // lyric: [String]
  },
  mounted () {  
    
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
    
    EventBus.$on("playsong",this.goLrc)
    this.BS.on('refresh', () => {
      // console.log("我刷新了")
    })
    this.BS.on('scrollStart', () => {
      console.log("即将滚动")
    })
  },
  updated(){
    // EventBus.$on('playsong',this.goLrc)
    // this.BS = null;
    // this.$nextTick(()=>{
    //   this.BS = new BScroll('.lrcContainer',{
    //     probeType: 3,
    //     click: true,
    //     mouseWheel: {
    //       speed: 20,
    //       invert: false,
    //       easeTime: 300,
    //     },
    //     // scrollbar: true,
    //   })
    // })
    
    
  },
  methods: {
    
    goLrc: function () {
      this.BS.refresh() // 不要改****搞不清楚，不晓得在哪加这行代码，，造孽啊
      // 获取音乐的时间
      let currentTime = this.musicplayer.currentTime;
      let lrcS = this.$refs.lrcBox.children
      // 样式
      lrcS.forEach(item => {
        item.style.fontWeight= "normal";
        item.style.color = "#4c4c4c";
      })
      // 获取所有已经播放的歌词
      let playedLrc = this.lrcArr.filter(item => currentTime*1000 >= item.time )
      let index = playedLrc.length
      if (index >= 1) {
        
        lrcS[index - 1].style.fontWeight = "bolder";
        lrcS[index - 1].style.color = "#000000"
        this.BS.scrollToElement(lrcS[index - 1], 300, 0, true, undefined );
      }
    },
    // // 转字符串歌词为数组形式
    // toLrcArr: function(lrc) {
      
    // }
  },
  computed: {
    musicplayer: function () {
      return this.$store.state.musicplayer
    },
    lrcArr: function () {
      return this.$store.state.lyric
    },
    lyricId: function () {
      return this.$store.state.lyricId
    },
    musicInfo: function () {
      return this.$store.state.musicInfo
    },
  },
  watch: {
    lrcArr: {
      handler(newV,oldV){
        console.log("更新DOM之前：",this.BS.content.childElementCount)
        // debugger
        this.$nextTick( () =>{
          console.log("DOM更新之后",this.BS)
          // debugger
          // 此处设置500毫秒后刷新BS  不晓得为啥，直接刷新不起作用  refresh放在了goLrc()内
          // this.BS.refresh()
          // debugger
          console.log("刷新之后",this.BS.content.childElementCount)
          // debugger
        })
      },
      deep:true
    },
    'musicInfo.id': function () {
      this.$store.dispatch('getLyric')
    },
    lyricId: function () {
      // console.log("shuaxin")
      
    }
  },
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
<template>
  <div class="footerBox" :data-theme="theme">
    <div class="player">

      <div class="songInfo">
        <img 
        :src="musicInfo.picUrl+'?param=50y50'" 
        @click="showPlay()">
        <div>
          <p>{{musicInfo.songName}}</p>
          <p>{{musicInfo.singer}}</p>
        </div>
      </div>

      <div class="playerBtns">
        <div class="btns">
          <i 
          class="iconfont"
          @click="lastSong()">&#xe6ac;</i>
          <i 
          class="iconfont" 
          v-if="playing"
          @click="playOrPause()">&#xe61b;</i>
          <i 
          class="iconfont" 
          v-else
          @click="playOrPause()">&#xe6ba;</i>
          <i 
          class="iconfont"
          @click="nextSong()">&#xe6a9;</i>
        </div>
        <div class="progress">
          <span>{{nowPlayTime}}</span>
          <div 
          class="progressBar"
          ref="progressBar"
          @click="changeCurrent($event)">
            <div 
            class="buffer"
            :style="{width: bufferPer + '%'}"></div>
            <div 
            class="played" 
            :data-theme="theme"
            :style="{width: playWidth + '%'}"></div>
          </div>
          <span>{{duration}}</span>
        </div>
      </div>

      <div class="volBtnBox">
        <i class="iconfont">&#xe61f;</i>
        <div 
        class="volBar"
        ref="volBar"
        @click="changeVol($event)">
          <div 
          :data-theme="theme"
          :style="{width: volWidth + '%'}"></div>
        </div>
        <i 
        class="iconfont songListBtn" 
        v-popover:hisplay>&#xe610;</i>
        
      </div>

    </div>
    <transition name="songPlay">
      <div class="songPlay" :style="{height: height + 'px'}" v-show="viewSongPlay">
        <song-play></song-play>
      </div>
    </transition>
    <!-- 播放记录 -->
    <el-popover
    ref="hisplay"
    placement="top-start"
    width="300"
    trigger="click">
      <div 
      class="hisPlayBox"
      style="width:100%;height:500px;">
        <transition-group name="hisPlay" tag="div">
          <div
          class="hisplay_item"
          v-for="(item,index) in historyPlay"
          :key="item.id"
          @mouseenter="viewDelBtn($event.target)"
          @mouseleave="closeDelBtn($event.target)"
          @click="playIt(item)">
            <div class="hisplay_item_index">
              <span v-if="Number(item.id)!==Number(musicId)">{{index+1}}</span>
              <i v-else class="iconfont" style="color:red;">&#xe61f;</i>
            </div>
            <div class="hisplay_item_songName">{{item.songName}}</div>
            <div class="hisplay_item_singer">{{item.singer}}</div>
            <i 
            class="iconfont delBtn"
            @click="delItem(item.id)">&#xe7a5;</i>
          </div>
        </transition-group>
      </div>
    </el-popover>
  </div>
</template>
<script>
import SongPlay from "@/components/SongPlay"
import { changeTimeToMinute } from "@/module/fun.js"
import { EventBus } from '@/util/bus.js'
import { ROOT } from '@/module/mutation-name.js'
export default {
  data () {
    return {
      playing: false,
      viewSongPlay: false,
      // 音乐播放详情页高度
      height: 0,
      // 当前播放百分比
      playWidth: 0,
      // 缓冲百分比
      bufferPer: 0,
      // 当前播放时间的显示
      nowPlayTime: "00:00",
      // 歌曲总时长
      duration: "00:00",
      // 音量百分比
      volWidth: 100,
      // 播放历史 显示开关
      playhis: false
    }
  },
  components:{
    SongPlay
  },
  mounted(){
    this.musicplayer.autoplay = true
    // this.musicplayer.src = "https://music.163.com/song/media/outer/url?id=1481966854.mp3"
    // audio 正在缓冲
    this.musicplayer.onprogress = this.onmusicloading
    // 为audio设置timeupdate事件，用于控制播放进度条
    this.musicplayer.ontimeupdate = this.ontimeupdate
    // audio 开始播放了
    this.musicplayer.onplaying = this.onplay
    this.musicplayer.onpause = this.onpause
    this.musicplayer.onended = this.nextSong
    // 设置历史播放记录
    this.$store.commit( ROOT.SET_HISPLAY, this.getHisPlay() )
    // 初始设置当前播放历史记录里的第一首歌
    this.historyPlay.length !==0 && this.playIt(this.historyPlay[0])
  },
  methods:{
    setPlayPageH(){
      this.height = window.innerHeight - 70;
    },
    // 显示音乐播放页
    showPlay: function () {
      this.viewSongPlay = !this.viewSongPlay
      this.setPlayPageH()
    },

    /**
     * 歌曲的播放操作
     */
    // 播放或者暂停
    playOrPause: function () {
      this.musicplayer.paused 
      ? this.musicplayer.play()
      : this.musicplayer.pause()
    },
    // 上一曲
    lastSong: function () {
      let nowId = this.musicId;
      let index = null;
      for (var i = 0; i < this.historyPlay.length; i++) {
        if (Number(this.historyPlay[i].id) === Number(nowId)) {
          index = i;
          break;
        }
      }
      if (index === 0) {
        let playMusicInfo = this.historyPlay[this.historyPlay.length-1]
        this.playIt(playMusicInfo)
      } else {
        this.playIt(this.historyPlay[index-1])
      }
    },
    // 下一曲
    nextSong: function () {
      let nowId = this.musicId;
      let index = null;
      for (var i = 0; i < this.historyPlay.length; i++) {
        if (Number(this.historyPlay[i].id) === Number(nowId)) {
          index = i;
          break;
        }
      }
      if (index === this.historyPlay.length-1) {
        let playMusicInfo = this.historyPlay[0]
        this.playIt(playMusicInfo)
      } else {
        this.playIt(this.historyPlay[index+1])
      }
    },

    // 手动改变当前播放位置
    changeCurrent: function (event) {
      // 获取点击位置
      let offsetX = event.offsetX
      let allWidth = window.getComputedStyle(this.$refs.progressBar).width;
          allWidth = parseInt(allWidth)
      // 进度百分比
      let percent = offsetX/allWidth;
      // 前进到的时间
      this.$store.state.musicplayer.currentTime = this.$store.state.musicplayer.duration * percent
    },

    // 改变当前音量值
    changeVol: function (event) {
      let offsetX = event.offsetX
      let allWidth = window.getComputedStyle(this.$refs.volBar).width;
          allWidth = parseInt(allWidth)
      // 进度百分比
      let percent = offsetX/allWidth
      this.$store.state.musicplayer.volume = percent;
      // 改变显示
      this.volWidth = percent*100
    },

    // 正在缓冲
    onmusicloading: function () {
      let buffer = this.musicplayer.buffered
      let bufferedTime = buffer.end(buffer.length - 1)
      let bufferPercent = ((bufferedTime/this.musicplayer.duration)*100).toFixed(2)
      this.bufferPer = bufferPercent
    },

    // 正在播放事件
    ontimeupdate: function () {
      EventBus.$emit("playsong")
      // 获取当前的播放时间
      let currentTime = this.musicplayer.currentTime;
      // 获取歌曲总时长
      let duration = this.musicplayer.duration;
      // 当前播放的百分比
      let percent = ((currentTime/duration)*100).toFixed(2)
      // 设置百分比
      this.playWidth = percent
      // 设置播放时间显示
      this.nowPlayTime = changeTimeToMinute(currentTime)
    },

    // 媒体开始播放了
    onplay: function () {
      this.playing = true
      // 设置总时长显示
      let duration = this.musicplayer.duration;
      this.duration = changeTimeToMinute(duration)
      // 暂停MV的播放
      
    },
    // 媒体暂停了
    onpause: function () {
      this.playing = false
    },

    // 获取用户的播放记录
    getHisPlay(){
      let hisplay = localStorage.getItem('hisplay')
      if (hisplay) {
        return JSON.parse(hisplay)
      } else {
        return []
      } 
    },
    
    /**
     * 将新的记录添加在缓存中
     * @param {object} newMusicInfo 要添加的历史记录
     */
    addHisPlay: function (newMusicInfo){
      // 获取以前的历史记录
      let storHisPlay = this.getHisPlay()
      // 判断以前是否存在该歌曲
      let hasId = storHisPlay.some( item =>{
        return Number(item.id) === Number(newMusicInfo.id)
      })
      // console.log("是否存在该歌曲",hasId)
      if (!hasId) {
        // 添加进缓存
        storHisPlay.push(newMusicInfo)
        localStorage.setItem("hisplay",JSON.stringify(storHisPlay))
        // console.log(storHisPlay)
        // 改变state播放历史
        this.$store.commit( ROOT.SET_HISPLAY, storHisPlay )
      }
    },
    /**
     * 删除选中的歌曲
     */
    delItem: function (id) {
      let index = null
      console.log(Number(this.historyPlay[0].id) === Number(id))
      for (var i = 0; i < this.historyPlay.length; i++) {
        if (Number(this.historyPlay[i].id) === Number(id)) {
          index = i;
          break
        }
      }
      console.log("index",index)
      let newList = this.historyPlay
      newList.splice(index,1)
      localStorage.setItem("hisplay",JSON.stringify(newList))
      this.$store.commit( ROOT.SET_HISPLAY, newList )
    },
    /**
     * 播放选中的歌曲  播放历史记录里
     */
    playIt: function (musicInfo) {
      this.$store.commit(ROOT.CHANGE_MUSIC,{
        musicId: musicInfo.id,
        picUrl: musicInfo.picUrl,
        songName: musicInfo.songName,
        singer: musicInfo.singer
      })
    },
    // 显示播放历史列表的删除按钮
    viewDelBtn: function (el) {
      el.children[3].style.display = "block"
    },
    // 不显示播放历史列表的删除按钮
    closeDelBtn: function (el) {
      el.children[3].style.display = "none"
    }
  },
  computed: {
    // 控制主题颜色
    theme: function (){
      return this.$store.state.theme
    },
    // 音乐播放器
    musicplayer: function () {
      return this.$store.state.musicplayer
    },
    // 当前播放的音乐id
    musicId: function () {
      return this.$store.state.musicInfo.id
    },
    // 当前播放歌曲的信息 
    musicInfo: function () {
      return this.$store.state.musicInfo
    },
    // 历史播放记录
    historyPlay: function () {
      return this.$store.state.historyPlay
    }
  },
  watch: {
    // 监听当前播放ID的变化
    musicId: function (newV) {
      this.$store.state.musicplayer.src = `https://music.163.com/song/media/outer/url?id=${newV}.mp3`;
      // 监听到id变化后，将新的一组数据写入缓存中
      this.addHisPlay(this.musicInfo)
    }
  }
}
</script>
<style lang="scss" scoped>
.footerBox {
  z-index: 99;
  height: 70px;
  border-top: 2px solid #aaaaaa;
  background-color: #eeeeee;
  /* 歌曲播放控件 */
  .player {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    /* 左边的歌曲信息，封面、歌名、歌手 */
    .songInfo {
      width: 260px;
      height: 50px;
      display: flex;
      align-items: center;
      margin-left: 20px;

      & > img {
        width: 45px;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        cursor: pointer;
      }

      & > div {
        width: 210px;
        height: 40px;
        margin-left: 5px;
        & > p {
          height: 20px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        & > p:nth-of-type(2) {
          font-size: 13px;
          color: #aaaaaa;
        }
      }
    }

    /* 中间的播放控件 */
    .playerBtns {
      width: 420px;
      height: 60px;

      .btns {
        width: 140px;
        height: 40px;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > i {
          font-size: 30px;
          width: 33px;
          height: 33px;
          line-height: 33px;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          &:hover {
            border-radius: 50%;
            background-color: #dfdfdf;
          }
        }
      }
      .progress {
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .progressBar {
          width: 350px;
          height: 4px;
          background-color: #aaa;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          &:hover {
            height: 6px;
            border-radius: 3px;
          }

          .buffer {
            position: absolute;
            height: 100%;
            width: 0%;
            background-color: #888888;
            border-radius: 2px;
            &:hover {
              border-radius: 3px;
            }
          }

          .played {
            position: absolute;
            height: 100%;
            width: 0%;
            border-radius: 2px;
            &:hover {
              border-radius: 3px;
            }
          }
        }

        & > span {
          font-size: 12px;
        }
      }
    }

    /* 右边的音量条 */
    .volBtnBox {
      width: 150px;
      height: 30px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      & > i {
        font-size: 20px;
      }

      .volBar {
        width: 60px;
        height: 5px;
        background-color: #aaa;
        margin-left: 10px;
        position: relative;
        cursor: pointer;
        border-radius: 2.5px;
        overflow: hidden;
        & > div {
          position: absolute;
          height: 100%;
          width: 80%;
        }
      }
      .songListBtn {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .songPlay {
    width: 100%;
    height: 500px;
    background-color: #aaaaaa;
    position: fixed;
    bottom: 70px;
  }
}

/** 历史播放记录 */
.hisPlayBox {
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #bbbbbb;
    border-radius: 3px;
  }
  .hisplay_item {
    display: flex;
    align-items: center;
    height: 25px;
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      color: #8f8f8f;
      background: #e2e2e2;
    }
    .hisplay_item_index {
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
    }
    .hisplay_item_songName,
    .hisplay_item_singer {
      width: 170px;
      height: 25px;
      line-height: 25px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hisplay_item_singer {
      width: 70px;
    }
    .delBtn {
      display: none;
      &:hover {
        color: red;
      }
    }
  }
}

.songPlay-enter-active {
  animation: bounce-in 0.5s linear;
}
.songPlay-leave-active {
  animation: bounce-in 0.5s linear reverse;
}
@keyframes bounce-in {
  0% {
    bottom: -1000px;
  }
  100% {
    bottom: 0px;
  }
}

/** 播放历史记录 */
.hisPlay-enter-active,
.hisPlay-leave-active {
  transition: all 1s;
}
.hisPlay-enter, .hisPlay-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(200px);
}
</style>

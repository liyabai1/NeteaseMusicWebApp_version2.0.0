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
          <i class="iconfont">&#xe6ac;</i>
          <i 
          class="iconfont" 
          v-if="playing"
          @click="playOrPause()">&#xe61b;</i>
          <i 
          class="iconfont" 
          v-else
          @click="playOrPause()">&#xe6ba;</i>
          <i class="iconfont">&#xe6a9;</i>
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
      </div>

    </div>
    <transition name="songPlay">
      <div class="songPlay" :style="{height: height + 'px'}" v-if="viewSongPlay">
        <song-play></song-play>
      </div>
    </transition>
  </div>
</template>
<script>
import SongPlay from "@/components/SongPlay"
import { changeTimeToMinute } from "@/module/fun.js"
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
      volWidth: 100
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
    // 下一曲

    // 上一曲


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
    }
  },
  watch: {
    // 监听当前播放ID的变化
    musicId: function (newV) {
      this.$store.state.musicplayer.src = `https://music.163.com/song/media/outer/url?id=${newV}.mp3`;

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
          cursor: pointer;
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
</style>

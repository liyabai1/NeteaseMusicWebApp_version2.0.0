<template>
  <div class="footerBox theme-red">
    <div class="player">

      <div class="songInfo">
        <img src="" alt="封面">
        <div>
          <p>歌名</p>
          <p>歌手</p>
        </div>
      </div>

      <div class="playerBtns">
        <div class="btns">
          <i class="iconfont">&#xe6ac;</i>
          <i class="iconfont" v-if="playing">&#xe61b;</i>
          <i class="iconfont" v-else>&#xe6ba;</i>
          <i class="iconfont">&#xe6a9;</i>
        </div>
        <div class="progress">
          <span>00:00</span>
          <div class="progressBar">
            <div class="buffer"></div>
            <div class="played theme-red"></div>
          </div>
          <span>05:20</span>
        </div>
      </div>

      <div class="volBtnBox">
        <i class="iconfont">&#xe61f;</i>
        <div class="volBar">
          <div class="theme-red"></div>
        </div>
      </div>

    </div>

    <div class="songPlay" v-show="false">
      歌曲播放页
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      playing: false
    }
  }
}
</script>
<style lang="scss" scoped>
.footerBox {
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
            width: 50%;
            background-color: #888888;
            border-radius: 2px;
            &:hover {
              border-radius: 3px;
            }
          }

          .played {
            position: absolute;
            height: 100%;
            width: 20%;
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
}
</style>

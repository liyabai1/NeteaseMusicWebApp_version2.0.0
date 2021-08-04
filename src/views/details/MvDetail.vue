<template>
  <div class="videoContainer">
    <el-skeleton
    style="width:100%"
    :loading="loading"
    :row="10"
    animated>
      <div style="display: flex;align-items: flex-start;justify-content: space-between;width: 1100px;margin:auto;">
        <div class="videoInfo">
          <video 
          :src="videoUrl" 
          autoplay 
          loop 
          controls
          ref="video"></video>
          <div class="videoContent">
            <div class="creator">
              <el-image
              style="width: 50px; height: 50px"
              :src="video.avatarUrl + '?param=50y50'"></el-image>
              <span>{{video.nickname}}</span>
            </div>
            <div class="title">{{video.title}}</div>
            <div class="publishTime">
              <span>发布：<span>{{video.publishTime}}</span></span>
              <span>播放：<span>{{video.playTime}}次</span></span>
            </div>
            <div class="des">{{video.description}}</div>
          </div>
          <!-- 评论信息 -->
          <comment-view
          :id="this.id"
          :type="this.type"
          :key="this.id"></comment-view>
        </div>
        <div class="recomVideo">
          <p>推荐视频</p>
          <div class="recomContent">
            <div
            class="item"
            v-for="item in recomVideo"
            :key="item.MvId"
            @click="goMv(item.MvId)">
              <div class="imageBox">
                <!-- 后续可添加时长 -->
                <el-image
                style="width:140px;height:80px;"
                :src="item.picUrl"
                lazy></el-image>
              </div>
              <div class="content">
                <p>{{item.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-skeleton>
  </div>
</template>
<script>
import HTTPS from '@/util/http.js'
import commentView from '@/components/comment'
export default {
  data () {
    return {
      // 是否正在加载
      loading: true,
      // 类型 ： 视频（video） or  MV
      type: null,
      // 视频或mv的id
      id: null,
      // 相关推荐
      recomVideo: [],
      // 视频信息
      video: {},
      /** 统一视频和MV的格式 */
      /** 作者头像 | avatarUrl */
      /** 作者昵称 | nickname  */
      /** 视频标题 | title     */
      /** 发布时间 | publishTime */
      /** 播放次数 | playTime */
      /** 视频描述 | description */
      // 视频播放地址
      videoUrl: ''
    }
  },
  components: {
    commentView
  },
  mounted () {
    // 因为视频可能为MV，也可能为视频
    // MV的id为纯数字， 视频为字母和数字的组合
    // 使用Number() 进行判断 ， 为NaN的是视频，执行视频对应的API NaN === NaN ==> false  坑
    this.id = this.$route.params.MvId
    this.isMOrV(this.id)
    
  },
  methods: {
    /**
     * 判断当前的id是否为MV或视频
     */
    isMOrV: function (id) {
      if (Number(id).toString() === 'NaN') {
        this.type = 5;  // 用于传值给评论获取
        this.loading = true
        this.getVideoUrl()   // 获取视频地址
        this.getRecomVideo() // 获取相关推荐
        this.getVideoData()  // 获取视频信息
      } else {
        this.type = 1
        this.getMvUrl()   // 获取视频Url
        this.getRecomMV() // 获取相关推荐
        this.getMvData()  // 获取MV信息
      }
    },
    /**
     * 获取***视频***的信息
     */
    getVideoData: function () {
      HTTPS.getVideoData(this.id)
        .then((res) => {
          if (res.data.code === 200) {
            let tempData = res.data.data
            this.video = {
              avatarUrl: tempData.avatarUrl,
              nickname: tempData.creator.nickname,
              title: tempData.title,
              publishTime: this.changeTime(tempData.publishTime),
              playTime: tempData.playTime,
              description: tempData.description
            }
            this.loading = false
          } else {
            this.$message({
              message: '获取视频信息失败',
              type: 'warning'
            })
          }
        }).catch((err) => {
          this.$message({
            message: '获取视频信息失败',
            type: 'warning'
          })
        })
    },
    /**
     * 获取视频的播放地址
     */
    getVideoUrl: function () {
      HTTPS.getVideoUrl(this.id)
        .then(res => {
          if (res.data.code === 200) {
            this.videoUrl = res.data.urls[0].url
          } else {
            console.error("获取视频地址失败",res)
            this.$message({
              message: '获取视频地址失败',
              type: 'warning'
            })
          }
        }).catch(err => {
          console.error(err)
          this.$message({
            message: '获取视频地址失败',
            type: 'warning'
          })
        })
    },
    /**
     * 获取相关推荐视频 *** 视频 ***
     */
    getRecomVideo: function () {
      HTTPS.getRecomVideo(this.id)
        .then(res => {
          if (res.data.code === 200) {
            const list = res.data.data
            this.recomVideo = list.map(item => {
              const temp = {
                MvId: item.vid,
                picUrl: item.coverUrl + '?param=140y80',
                title: item.title
              }
              return temp
            })
          } else {
            this.$message({
              message: '获取相关推荐视频失败',
              type: 'warning'
            })
          }
        }).catch(err => {
          console.error('获取推荐视频失败：', err)
          this.$message({
            message: '获取相关推荐视频失败',
            type: 'warning'
          })
        })
    },

    /**
     * 获取***MV***的信息
     */
    getMvData: function () {
      HTTPS.getMvData(this.id)
      .then( res => {
        if (res.data.code === 200) {
          let tempData = res.data.data
          this.video = {
            avatarUrl: tempData.cover,
            nickname: tempData.artistName,
            title: tempData.name,
            publishTime: tempData.publishTime,
            playTime: tempData.playCount,
            description: ""
          }
          this.loading = false
        } else {
          this.$message({
            message: '获取MV信息失败',
            type: 'warning'
          })
        }
      }).catch( err => {
        this.$message({
          message: '获取MV信息失败',
          type: 'warning'
        })
      }); 
    },

    /**
     * 获取MV的相关推荐
     */
    getRecomMV: function () {
      HTTPS.getRecommv(this.id)
      .then( res => {
        if (res.data.code === 200) {
          const list = res.data.mvs
          this.recomVideo = list.map(item => {
            const temp = {
              MvId: item.id,
              picUrl: item.cover + '?param=140y80',
              title: item.name
            }
            return temp
          })
        } else {
          this.$message({
            message: '获取相关推荐视频失败',
            type: 'warning'
          })
        }
      }).catch( err => {
        this.$message({
          message: '获取相关推荐视频失败',
          type: 'warning'
        })
      });
    },
    /**
     * 获取Mv的播放地址
     */
    getMvUrl: function () {
      HTTPS.getMvUrl(this.id)
      .then( res => {
        if (res.data.code === 200) {
          this.videoUrl = res.data.data.url
        } else {
          this.$message({
            message: '获取视频地址失败',
            type: 'warning'
          })
        }
      }).catch( err => {
        console.error(err)
        this.$message({
          message: '获取视频地址失败',
          type: 'warning'
        })
      });
    },

    /**
     * 跳转到Mv播放页，也就是当前页面
     * 由于页面还是在该页面，所以改变当前页面的id值即可，监听id的变化，当发生改变时，重新获取新的数据进行渲染
     * 缺点是点击上一页返回时，不会返回到上一个视频播放页
     */
    goMv: function (MvId) {
      this.id = MvId
    },
    // 时间戳改为正常显示时间
    changeTime: function (time) {
      time = new Date(time)
      time = time.toLocaleDateString().replace(/\//g, '-') + ' ' + time.toTimeString().substr(0, 8)
      return time
    }
  },
  watch: {
    id: function (newV) {
      this.isMOrV(this.id)
    },
    // 监听loading,因为骨架屏的原因，初始的时候没有video这个DOM节点，所以无法对其进行操作
    loading: function (newV) {
      this.$nextTick(()=>{
        let video = this.$refs.video;
        // 当MV播放时，暂停音乐播放
        video && (video.onplaying = this.$store.state.musicplayer.pause())
        // 当手动点击音乐播放时，暂停Mv的播放
        
      })
    }
  },
  filters: {
    
  }
}
</script>
<style lang="scss" scoped>
.videoContainer {
  width: 1100px;
  flex: 1;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  margin: auto {
    top: 0px;
  }
  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #aaaaaa;
    border-radius: 3px;
  }
  .videoInfo {
    display: inline-block;
    width: 750px;
    margin-top: 20px;
    & > video {
      width: 700px;
    }
    .videoContent {
      width: 100%;
      .creator {
        margin-top: 20px;
        margin-bottom: 20px;
        height: 50px;
        .el-image {
          border-radius: 50%;
          vertical-align: middle;
        }
        & > span {
          margin-left: 20px;
          font-size: 13px;
        }
      }
      .title {
        font-size: 20px;
        font-weight: bolder;
      }
      .publishTime {
        font-size: 13px;
        color: #aaaaaa;
        & > span {
          margin-right: 20px;
        }
      }
      .des {
        font-size: 12px;
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  }
  .recomVideo {
    display: inline-block;
    width: 300px;
    & > p {
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      font-weight: bolder;
    }
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      .imageBox {
        width: 150px;
        height: 80px;
        .el-image {
          border-radius: 5px;
        }
      }
      .content {
        font-size: 14px;
        overflow: hidden;
      }
    }
  }
}
</style>

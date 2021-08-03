<template>
  <div class="listInfoContainer">
    <el-skeleton 
    style="width: 100%" 
    :loading="listLoading" 
    animated
    :rows="20">
      <div>
        <div class="listInfoBox">
          <div class="imageBox">
            <el-image 
            :src="listInfo.coverImgUrl"
            style="width:185px;height:185px"></el-image>
          </div>
          <div class="infoContent">
            <div class="title">{{listInfo.name}}</div>
            <div class="creator">
              <el-image
              class="creator_img"
              :src="listInfo.avatarUrl + '?param=100y100'"
              style="width: 35px;height: 35px"
              lazy></el-image>
              <span>{{listInfo.nickname}}</span>
              <span>{{listInfo.createTime | toTime()}}创建</span>
            </div>
            <div class="tags">标签: <span>{{listInfo.tags.join("、")}}</span></div>
            <div class="count">
              <span>歌曲：<span>{{listInfo.trackCount}}</span></span>
              <span>播放：<span>{{listInfo.playCount}}</span></span>
            </div>
            <div class="des">
              简介：<span>{{listInfo.description}}</span>
            </div>
          </div>
        </div>
        <playlist-com :songData="listInfo.tracks | getSongdata()"></playlist-com>
      </div>
    </el-skeleton>
  </div>
</template>
<script>
import PlaylistCom from "@/components/PlayList/PlayList"
export default {
  data() {
    return {
      listId: null
    }
  },
  components: {
    PlaylistCom
  },
  mounted () {
    // 因为首页在登录后有一个每日推荐歌单，自定义其歌单id为0，
    // 因此当歌单Id为0时，需要搜索每日推荐歌曲
    if ( Number(this.$route.params.listId) !== 0) {
      this.$store.dispatch("getListInfo", {listId: this.$route.params.listId,cookie: localStorage.getItem("cookie")})
    } else {
      // 获取每日推荐
      this.$store.dispatch('getRecomSong', localStorage.getItem("cookie"))
    }
    
  },
  methods: {
    
  },
  /** 解决同一路由页面，不同参数不刷新问题 */
  beforeRouteUpdate: function (to,from,next) {
    if (to.params.listId !== from.params.listId) {
      next();
      this.listId = to.params.listId
      this.$store.dispatch("getListInfo", {listId: to.params.listId,cookie: localStorage.getItem("cookie")})
    }
  },
  computed: {
    listInfo: function () {
      return this.$store.state.pl.listInfo
    },
    listLoading: function () {
      return this.$store.state.pl.listLoading
    }
  },
  filters: {
    getSongdata: function (listData) {
      return listData.map( item => {
        let temp = {
          songId: item.id,
          songName: item.name,
          songTime: item.dt,
          singer: item.ar.map(item=>item.name).join("/"),
          album: item.al.name,
          fee: item.fee,
          picUrl: item.al.picUrl
        }
        return temp
      })
    },
    // 时间戳转为时间
    toTime: function (time) {
      time = new Date(time)
      time = time.toLocaleDateString().replace(/\//g, "-")
      return time
    }
  }
}
</script>
<style lang="scss" scoped>
.listInfoContainer {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a0a0a0;
    border-radius: 3px;
  }
  .listInfoBox {
    width: 95%;
    min-width: 1100px;
    overflow-x: hidden;
    display: flex;
    align-items: flex-start;
    margin: auto {
      top: 20px;
    }
    .imageBox {
      width: 200px;
      height: 200px;
      .el-image {
        border-radius: 10px;
      }
    }
    .infoContent {
      flex: 1;
      // 标题
      .title {
        font-size: 20px;
        font-weight: bolder;
      }
      .creator {
        display: flex;
        align-items: center;
        font-size: 13px;
        .creator_img {
          border-radius: 50%;
          margin: 5px;
        }
        & > span {
          margin: 0px {
            right: 5px;
            left: 5px;
          }
        }
        & > span:nth-of-type(1) {
          color: #396cf6;
        }
      }
      .tags {
        margin: 0px {
          top: 5px;
          bottom: 5px;
        }
      }
      .count {
        & > span > span {
          font-size: 14px;
          margin-right: 10px;
          color: #acacac;
        }
      }
      .des {
        margin: 0px {
          top: 10px;
          bottom: 10px;
        }
      }
    }
  }
}
</style>
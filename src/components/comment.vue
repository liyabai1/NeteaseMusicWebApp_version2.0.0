<template>
  <div class="commentContainer">
    <div
    v-if="!loading">
      <div
      class="item"
      v-for="item in comment"
      :key="item.commentId">
        <div class="comment">
          <div class="imageBox">
            <el-image 
            style="width:50px;height:50px;"
            :src="item.user.avatarUrl + '?param=50y50'" 
            lazy></el-image>
          </div>
          <div class="infoBox">
            <p class="nickname">{{item.user.nickname}}</p>
            <p class="content">{{item.content}}</p>
            <p class="time">{{item.time | changeView()}}</p>
            <div class="info">
              <div 
              class="replay"
              v-if="item.showFloorComment.replyCount !== 0"
              @click="showFloor(item.commentId)">{{item.showFloorComment.replyCount}}条回复 > </div>
              <div class="liked">
                <i class="iconfont">&#xe609;</i>
                <span>{{item.likedCount}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 楼层评论 -->
        <floor-comment 
        v-if="show && floorSet.has(item.commentId)" 
        :id='id'
        :parentCommentId="item.commentId"
        :type="type"></floor-comment>
      </div>
    </div>
    <div v-else>加载中....</div>
    
    <!-- 分页器 -->
    <div class="pagnations">
      <i class="iconfont" @click="searchPre()">&#xe620;</i>
      <span>{{pageNo}}</span>
      <i class="iconfont" @click="searchNext()">&#xe629;</i>
    </div>
  </div>
</template>
<script>
import FloorComment from "@/components/FloorComment"
import  HTTPS  from "@/util/http.js"
export default {
  data(){
    return {
      // 正在加载
      loading: true,
      // 是否还有更多的评论
      hasmore: true,
      // 页数
      pageNo: 1,
      // 每页数量
      pageSize: 30,
      // 排序方式
      sortType: 1,
      // 评论内容
      comment: [],
      // 用来添加显示楼层评论的commentid
      show: false,
      floorSet: new Set()
    }
  },
  props: {
    id: [Number,String],
    type: [Number,String]
  },
  components: {
    FloorComment
  },
  mounted(){
    /**
     * 因为接口文档书写有误
     * 文档中sortTyp这个排序参数可选值有1： 推荐排序，2:按热度排序,3:按时间排序
     * 但是发现当资源类型为5： 视频时，按推荐排序获取不到数据，提示参数错误
     * 当获取视频的评论时， sortType 的参数设置为： 99： 推荐排序，2:按热度排序,3:按时间排序
     * 当获取MV的评论时， sortType 的参数与文档一致
     */
    // console.log(this.id,this.type)
    // Number(this.type) === 5 && (this.sortType = 99)
    this.sortType = 99
    this.getComments()
  },
  methods: {
    
    // 获取评论
    getComments: function () {
      this.loading = true
      HTTPS.getComment(this.id, this.type, this.pageNo, this.pageSize, this.sortType)
      .then(res => {
        if (res.data.code === 200) {
          let resData = res.data.data
          // 设置所需信息
          console.log(resData.comments)
          this.hasmore = resData.hasMore;
          this.comment = resData.comments;
          this.loading = false
        }
      })
      .catch(err => console.error(err))
    },

    // 显示楼层评论
    showFloor: function (commentId) {
      this.show = false
      this.floorSet.add(commentId)
      this.show = true
      console.log(this.floorSet)
    },

    // 上一页
    searchPre: function () {
      this.pageNo !== 1 && (()=>{
        this.pageNo --;
        this.getComments()
      })() 
    },
    // 下一页
    searchNext: function () {
      this.hasmore && (()=>{
        this.pageNo++;
        this.getComments()
      })()
    }
  },
  filters: {
    changeView: function (time) {
      time = new Date(time)
      time = time.toLocaleString().replace(/\//g,"-")
      return time
    }
  }
}
</script>
<style lang="scss" scoped>
.commentContainer {
  width: 750px;
  .item {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #aaaaaa;
    .comment {
      width: 100%;
      display: flex;
      .imageBox {
        width: 60px;
        height: 60px;
        .el-image {
          border-radius: 50%;
        }
      }
      .infoBox {
        flex: 1;
        .nickname {
          display: block;
          height: 25px;
          color: #1967f8;
          font-size: 14px;
          line-height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .content {
          display: block;
          width: 100%;
        }
        .time {
          font-size: 12px;
          color: #aaaaaa;
          line-height: 20px;
        }
        .info {
          width: 100%;
          position: relative;
          height: 20px;
          font-size: 13px;
          line-height: 20px;
          .replay {
            position: absolute;
            left: 0px;
            color: #1967f8;
            cursor: pointer;
          }
          .liked {
            position: absolute;
            right: 0px;
          }
        }
      }
    }
  }
}
.pagnations {
  width: 200px;
  height: 50px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    display: inline-block;
    height: 50px;
    line-height: 50px;
  }
  i {
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
}
</style>
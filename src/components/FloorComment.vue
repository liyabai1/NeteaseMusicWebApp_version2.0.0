<template>
  <div 
  class="floorCommentBox"
  v-infinite-scroll="loadFloorComment" 
  style="overflow:auto">
    <div 
    class="item"
    v-for="item in floorComment"
    :key="item.commentId">
      <div class="imageBox">
        <el-image 
        :src="item.user.avatarUrl+'?param=30y30'"
        style="width:30px;height:30px;"></el-image>
      </div>
      <div class="infoBox">
        <p class="nickname">{{item.user.nickname}}</p>
        <p class="content">{{item.content}}</p>
        <p class="time">{{item.time | changeView()}}</p>
      </div>
    </div>
    <div 
    v-if="hasMore"
    style="text-align:center;">加载中...</div>
  </div>
</template>
<script>
import  HTTPS  from "@/util/http.js"
export default {
  data(){
    return {
      hasMore: true,
      limit : 20, //每页多少条数据
      time: 0, // 分页参数 取上一页最后一项的 time 获取下一页数据
      // 楼层评论数据
      floorComment: []
    }
  },
  props: {
    id: [Number,String],  // 资源id
    parentCommentId: [Number,String],   // 楼层评论id
    type: [Number,String],  // 资源类型
  },
  mounted(){
    // console.log("刷新",this.id,this.parentCommentId,this.type)
    // this.getFloorComment()
  },
  methods: {
    getFloorComment: function () {
      // 获取楼层评论
      HTTPS.getFloorComment(this.parentCommentId, this.id, this.type, this.limit, this.time)
      .then( res => {
        if (res.data.code === 200) {
          this.floorComment.push(...res.data.data.comments)
          this.hasMore = res.data.data.hasMore;
          this.time = this.floorComment[this.floorComment.length - 1].time
        }
        console.log(this.floorComment)
      })
      .catch(err => {
        console.error('获取楼层评论失败',err)
        this.$message({
          message: "获取评论回复失败",
          type: "warning"
        })  
      })
    },

    // 下滑到底加载新数据
    loadFloorComment: function () {
      // 判断是否还有新的数据可以请求
      this.hasMore && this.getFloorComment()
    }
  },
  filters: {
    changeView: function (time) {
      return new Date(time).toLocaleString().replace(/\//g,"-")
    }
  }
}
</script>
<style lang="scss" scoped>
.floorCommentBox {
  width: 100%;
  max-height: 500px;
  background: #f9f9f9;
  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b6b6b6;
    border-radius: 3px;
  }
  .item {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    .imageBox {
      height: 50px;
      height: 50px;
      margin-left: 50px;
      margin-right: 10px;
      .el-image {
        border-radius: 50%;
        margin: auto;
      }
    }
    .infoBox {
      flex: 1;
      .nickname {
        height: 20px;
        line-height: 20px;
        color: #5f91fd;
        font-size: 14px;
      }
      .conetent {
        font-size: 14px;
      }
      .time {
        font-size: 12px;
        color: #aaaaaa;
        line-height: 20px;
      }
    }
  }
}
</style>
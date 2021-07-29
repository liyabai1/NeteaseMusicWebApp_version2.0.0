<template>
  <div>
    <div class="topBar">
      <div>精品歌单</div>
      <div 
      class="tagBtn" 
      v-popover:tagBox>
        <i class="iconfont">&#xe713;</i>
        <span>全部</span>
      </div>
    </div>
    <!-- 标签弹窗 -->
    <el-popover
    ref="tagBox"
    width="500"
    placement="bottom-end"
    trigger="hover"
    > 
      <div class="allListTag">
        全部歌单
      </div>
      <div class="tagBox">
        <div
        class="typeItem"
        v-for="item in listTag"
        :key="item.type"
        > 
          <div class="typeBox">
            {{item.category}}
          </div>
          <div class="tags">
            <div 
            class="tagItem"
            v-for="tag in item.tags"
            :key="tag.id">{{tag.name}}</div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  data () {
    return{
      
    }
  },
  mounted(){
    // 获取标签，并将其保存在state中
    if (this.$store.state.homeSonglist.listTag.length === 0) {
      this.$store.dispatch("getPlaylistTag")
    }
  },
  computed: {
    listTag: function (){
      return this.$store.state.homeSonglist.listTag
    }
  }
}
</script>
<style lang="scss" scoped>
.topBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div:nth-child(1) {
    font-size: 25px;
    font-weight: bolder;
  }
  .tagBtn {
    height: 20px;
    min-width: 60px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #aaaaaa;
    cursor: pointer;
  }
}
/** 标签弹出框样式 */
.allListTag {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #aaaaaaa6;
  margin-bottom: 10px;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    color: rgb(251, 73, 73);
  }
}
.tagBox {
  width: 100%;
  .typeItem {
    width: 100%;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid #aaaaaaa6;
    margin-bottom: 10px;
    .typeBox {
      width: 100px;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      color: #aaaaaa;
    }
    .tags {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .tagItem {
        width: 90px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover {
          color: rgb(251, 73, 73);
        }
      }
    }
  }
}
</style>
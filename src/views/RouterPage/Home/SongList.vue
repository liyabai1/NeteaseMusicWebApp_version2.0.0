<template>
  <div class="songListPage">
    <div class="topBar">
      <div>精品歌单</div>
      <div
      class="tagBtn"
      v-popover:tagBox>
        <i class="iconfont">&#xe713;</i>
        <span>{{nowTag}}</span>
      </div>
    </div>
    <!-- 标签弹窗 -->
    <el-popover
    ref="tagBox"
    width="500"
    placement="bottom-end"
    trigger="hover"
    >
      <div
      class="allListTag"
      @click="nowTag = '全部'">
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
            :key="tag.id"
            @click="changeTag(tag.name)">{{tag.name}}</div>
          </div>
        </div>
      </div>
    </el-popover>

    <!-- 歌单内容 -->
    <div class="listContent"
    v-infinite-scroll="loadList"
    :infinite-scroll-distance="100"
    :infinite-scroll-delay="500"
    style="overflow:auto">
      <songlist-container :hqList="hqList"></songlist-container>
    </div>
  </div>
</template>
<script>
import SonglistContainer from '@/components/HomePage/SonglistPage/SonglistContainer'
import { HOME_LIST } from '@/module/mutation-name.js'
export default {
  data () {
    return {
      nowTag: '全部',
      limit: 30
    }
  },
  components: {
    SonglistContainer
  },
  mounted () {
    // 获取标签，并将其保存在state中
    if (this.$store.state.homeSonglist.listTag.length === 0) {
      this.$store.dispatch('getPlaylistTag')
    }
  },
  methods: {
    /**
     * 改变当前的标签分类
     */
    changeTag: function (tagName) {
      this.nowTag = tagName
      this.$store.commit([HOME_LIST.CHANGE_NOW_TAG], tagName)
    },

    /**
     * 请求歌单信息
     */
    loadList: function () {
      this.$store.dispatch('getHqList', {
        cat: this.nowTag,
        limit: this.limit
      })
    }
  },
  computed: {
    listTag: function () {
      return this.$store.state.homeSonglist.listTag
    },
    // 精品歌单数据
    hqList: function () {
      return this.$store.state.homeSonglist.hqList
    }
  }
}
</script>
<style lang="scss" scoped>
.songListPage {
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: column;

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
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
      border-radius: 10px;
      border: 1px solid #aaaaaa;
      cursor: pointer;
    }
  }
  .listContent {
    flex: 1;
    height: 0;
    &::-webkit-scrollbar {
      width: 6px;
      opacity: 0;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #444;
      border-radius: 3px;
    }
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

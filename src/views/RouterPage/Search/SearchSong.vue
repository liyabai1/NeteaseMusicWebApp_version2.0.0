<template>
  <div>
    <el-skeleton 
    style="width: 100%" 
    :loading="loading" 
    animated>
      <playlist-com :songData="searchSongData"></playlist-com>
    </el-skeleton>
    <!-- 分页 -->
    <div class="pagnations">
      <i class="iconfont" @click="searchPre()">&#xe620;</i>
      <span>{{offsetPage}}</span>
      <i class="iconfont" @click="searchNext()">&#xe629;</i>
    </div>
  </div>
</template>
<script>
import PlaylistCom from "@/components/PlayList/PlayList"
import { SEARCH_RES } from '@/module/mutation-name.js'
export default {
  data() {
    return {
      limit: 30,
      offsetPage: 1,
      type: 1,    // 不更改
    }
  },
  components: {
    PlaylistCom
  },
  mounted(){
    // 开始搜索单曲
    this.search()
  },
  methods: {
    // 搜索上一个
    searchPre: function () {
      // 获取总数
      let count = this.$store.state.search.songCount;
      // 总页数
      let allPageCont = Math.ceil(count / this.limit)
      let searchPage = this.offsetPage - 1
      if (searchPage <= 0) {
        this.$message("已经是第一页了")
      } else {
        --this.offsetPage
        this.search()
      }
    },
    // 搜索下一个
    searchNext: function () {
      // 获取总数
      let count = this.$store.state.search.songCount;
      // 总页数
      console.log(count)
      let allPageCont = Math.ceil(count / this.limit)
      console.log(allPageCont)
      let searchPage = this.offsetPage + 1
      if (searchPage > allPageCont) {
        this.$message("已经是最后一页了")
      } else {
        ++this.offsetPage
        this.search()
      }
    },
    // 搜索
    search: function () { 
      // 设置开始搜索状态
      this.$store.commit(SEARCH_RES.SET_SONGLOADING, true)
      this.$store.dispatch("search",{
        keywords: this.keywords, 
        limit: this.limit, 
        offset: (this.offsetPage - 1) * this.limit,
        type: this.type 
      })
    }
  },
  computed: {
    keywords: function () {
      return this.$store.state.search.keywords
    },
    searchSongData: function () {
      return this.$store.state.search.searchResSong
    },
    loading: function () {
      return this.$store.state.search.songLoading
    }
  }
}
</script>
<style lang="scss" scoped>
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
<template>
  <div>
    <el-skeleton
    style="width: 100%"
    :loading="loading"
    animated>
      <song-list :songList="searchListData"></song-list>
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
import SongList from '@/components/SongList/SongList'
import { SEARCH_RES } from '@/module/mutation-name.js'
export default {
  data () {
    return {
      limit: 30,
      offsetPage: 1,
      type: 1000 // 不更改
    }
  },
  components: {
    SongList
  },
  mounted () {
    // 初始搜索
    this.search()
  },
  methods: {
    // 搜索上一个
    searchPre: function () {
      // // 获取总数
      // const count = this.$store.state.search.listCount
      // // 总页数
      // const allPageCont = Math.ceil(count / this.limit)
      const searchPage = this.offsetPage - 1
      if (searchPage <= 0) {
        this.$message('已经是第一页了')
      } else {
        --this.offsetPage
        this.search()
      }
    },
    // 搜索下一个
    searchNext: function () {
      // 获取总数
      const count = this.$store.state.search.listCount
      // 总页数
      const allPageCont = Math.ceil(count / this.limit)
      console.log(allPageCont)
      const searchPage = this.offsetPage + 1
      if (searchPage > allPageCont) {
        this.$message('已经是最后一页了')
      } else {
        ++this.offsetPage
        this.search()
      }
    },
    // 搜索
    search: function () {
      // 设置开始搜索状态
      this.$store.commit(SEARCH_RES.SET_LISTLOADING, true)
      this.$store.dispatch('search', {
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
    searchListData: function () {
      return this.$store.state.search.searchResList
    },
    loading: function () {
      return this.$store.state.search.listLoading
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

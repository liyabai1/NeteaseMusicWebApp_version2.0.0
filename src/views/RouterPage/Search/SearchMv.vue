<template>
  <div>
    <el-skeleton 
    style="width: 100%" 
    :loading="mvloading" 
    animated>
      <personalized 
      :personList="searchMvData"
      :imgWidth="'355px'"
      :imgHeight="'200px'"></personalized>
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
import Personalized from '@/components/HomePage/FindPage/Personalized' 
import { SEARCH_RES } from '@/module/mutation-name.js'
export default {
  data(){
    return {
      limit: 30,
      offsetPage: 1,
      type: 1014,    // 不更改
    }
  },
  components: {
    Personalized
  },
  mounted() {
    this.search()
  },
  methods: {
    // 搜索上一个
    searchPre: function () {
      // 获取总数
      let count = this.$store.state.search.mvCount;
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
      let count = this.$store.state.search.mvCount;
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
      this.$store.commit(SEARCH_RES.SET_MVLOADING, true)
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
    searchMvData: function () {
      return this.$store.state.search.searchResMv
    },
    mvloading: function () {
      return this.$store.state.search.mvLoading
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
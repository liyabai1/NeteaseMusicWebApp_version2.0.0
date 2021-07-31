<template>
  <div>
    <rank-list
    v-for=" item in rankData "
    :key="item.listId"
    :rankList="item"></rank-list>
  </div>
</template>
<script>
import RankList from '@/components/HomePage/RankPage/RankList'
export default {
  data(){
    return {}
  },
  components: {
    RankList
  },
  mounted(){
    // 请求排行榜数据
    this.$store.state.rank.rankData.length === 0 && this.$store.dispatch('getRankData')
  },
  computed: {
    rankData : function () {
      return this.$store.state.rank.rankData
    }
  }
}
</script>
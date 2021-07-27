<template>
  <div>
    <banner-box></banner-box>
    <div class="title">推荐歌单 > </div>
    <recomlist-ske :load="recomListLoading">
      <recom-list :key="recomListLoading"></recom-list>
    </recomlist-ske>
  </div>
</template>
<script>
import BannerBox from "@/components/HomePage/FindPage/BannerBox"
import RecomlistSke from "@/components/Skeleton/RecomlistSke"
import RecomList from "@/components/HomePage/FindPage/RecomList"
export default {
  data(){
    return {}
  },
  components:{
    BannerBox,
    RecomlistSke,
    RecomList
  },
  computed: {
    recomListLoading: function (){
      return this.$store.state.home.recomListLoading
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
.title {
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  font-weight: bolder;
}
</style>
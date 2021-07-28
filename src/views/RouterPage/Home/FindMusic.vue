<template>
  <div>
    <banner-box></banner-box>
    <div class="title">推荐歌单 > </div>
    <recomlist-ske :load="recomListLoading">
      <recom-list :key="recomListLoading"></recom-list>
    </recomlist-ske>
    <div 
    class="title"
    @click="goPersonalized()">独家放送 > </div>
    <personalized-ske :load="personLoading">
      <personalized 
      :personList="personList" 
      :imgWidth="'355px'"
      :imgHeight="'200px'"></personalized>
    </personalized-ske>
    <div 
    class="title" 
    @click="goNewMusic()">最新音乐 > </div>
    
  </div>
</template>
<script>
import BannerBox from "@/components/HomePage/FindPage/BannerBox"
import RecomlistSke from "@/components/Skeleton/RecomlistSke"
import RecomList from "@/components/HomePage/FindPage/RecomList"
import PersonalizedSke from "@/components/Skeleton/PersonalizedSke"
import Personalized from "@/components/HomePage/FindPage/Personalized"
export default {
  data(){
    return {
      
    }
  },
  mounted(){
    // 如果缓存中有独家放松数据，则使用缓存，否则请求数据
    if (this.$store.state.home.personalizedData.length === 0) {
      this.$store.dispatch("getPersonData")
    }
  },
  methods: {
    // 跳转到独家放松列表页
    goPersonalized(){
      this.$router.push({name: 'personalized'})
    }
  },
  components:{
    BannerBox,
    RecomlistSke,
    RecomList,
    PersonalizedSke,
    Personalized
  },
  computed: {
    recomListLoading: function (){
      return this.$store.state.home.recomListLoading
    },
    personList: function (){
      return this.$store.state.home.personalizedData
    },
    personLoading: function () {
      return this.$store.state.home.personLoading
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
  cursor: pointer;
}
</style>
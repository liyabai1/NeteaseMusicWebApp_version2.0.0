<template>
  <div>
    <banner-box></banner-box>
    <div 
    class="title"
    @click="goSonglist()">推荐歌单 > </div>
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
    <new-music :newMusic="newMusic" :key="newMusic.length"></new-music>
    <div
    class="title"
    @click="goMv()">推荐MV > </div>
    <recom-mv :mvList="homeRecomMv"></recom-mv>
  </div>
</template>
<script>
import BannerBox from '@/components/HomePage/FindPage/BannerBox'
import RecomlistSke from '@/components/Skeleton/RecomlistSke'
import RecomList from '@/components/HomePage/FindPage/RecomList'
import PersonalizedSke from '@/components/Skeleton/PersonalizedSke'
import Personalized from '@/components/HomePage/FindPage/Personalized'
import NewMusic from '@/components/HomePage/FindPage/NewMusic'
import RecomMv from "@/components/HomePage/FindPage/RecomMv"
export default {
  data () {
    return {

    }
  },
  mounted () {
    // 如果缓存中有独家放松数据，则使用缓存，否则请求数据
    if (this.$store.state.home.personalizedData.length === 0) {
      this.$store.dispatch('getPersonData')
    }
    // 获取最新音乐
    this.$store.dispatch('getNewMusic', 0)
    // 获取推荐MV
    this.$store.dispatch('getRecomMV')
  },
  methods: {
    // 跳转到推荐歌单页
    goSonglist () {
      this.$router.push({ name: 'homeSonglist' })
    },
    // 跳转到独家放松列表页
    goPersonalized () {
      this.$router.push({ name: 'personalized' })
    },
    // 跳转到最新音乐界面
    goNewMusic () {
      this.$router.push({ name: 'newMusic' })
    },
    // 跳转到mv界面
    goMv () {
      this.$router.push({ name: 'mv' })
    }
  },
  components: {
    BannerBox,
    RecomlistSke,
    RecomList,
    PersonalizedSke,
    Personalized,
    NewMusic,
    RecomMv
  },
  computed: {
    // 推荐歌单是否正在加载
    recomListLoading: function () {
      return this.$store.state.home.recomListLoading
    },
    // 独家放送
    personList: function () {
      return this.$store.state.home.personalizedData
    },
    // 独家放松是否正在加载
    personLoading: function () {
      return this.$store.state.home.personLoading
    },
    // 最新音乐
    newMusic: function () {
      return this.$store.state.home.newMusic.slice(0, 12)
    },
    // 推荐MV数据
    homeRecomMv: function () {
      return this.$store.state.home.homeRecomMv
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

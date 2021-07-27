<template>
  <el-carousel
  :interval="4000" 
  type="card" 
  height="200px">
    <el-carousel-item v-for="item in bannerData" :key="item.imageUrl">
      <el-image  :src="item.imageUrl"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>
<script>

export default {
  data(){
    return{
      bannerData: this.$store.state.home.banner
    }
  },
  mounted(){
    // 判断当前是否在store中存在banner的数据，如果存在，则不需要重新请求 
    this.$store.state.home.banner.length === 0 ? this.$store.dispatch("getBanner") : null
  }
}
</script>
<style lang="scss" scoped>
.el-carousel {
  width: 1100px;
}
.el-carousel__item {
  border-radius: 10px;
}
.el-carousel__indicator > button {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}
</style>
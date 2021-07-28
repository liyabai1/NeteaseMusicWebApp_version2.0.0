<template>
  <!-- 左侧用户歌单栏 -->
  <el-skeleton 
  :loading="load" 
  animated 
  style="width:100%"
  >
    <template slot="template">
      <div class="mainContainer">
        <div v-for="i in 10" :key="i">
          <el-skeleton-item variant="image" style="width: 210px; height: 210px;" />
          <el-skeleton-item variant="text"></el-skeleton-item>
          <el-skeleton-item variant="text"></el-skeleton-item>
        </div>
      </div>
    </template>

    <slot></slot>

  </el-skeleton>
</template>
<script>
export default {
  props:{
    load: Boolean
  }
}
</script>
<style lang="scss" scoped>
.mainContainer {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  & > div {
    margin: 0px {
      top: 5px;
      left: 55px;
    }
  }
}
</style>

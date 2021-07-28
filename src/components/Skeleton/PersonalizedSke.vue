<template>
<!-- 独家放送骨架屏 -->
  <el-skeleton 
  style="width: 100%" 
  :loading="personLoading" 
  animated
  :count="3">
    <template slot="template">
      <div class="item">
        <el-skeleton-item variant="image" style="width: 330px; height: 200px;" />
        <el-skeleton-item variant="text"></el-skeleton-item>
      </div>
    </template>

    <slot></slot>

  </el-skeleton>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  props:{
    personLoading: Boolean
  }
}
</script>
<style lang="scss" scoped>
.item {
  display: inline-block;
  width: 330px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
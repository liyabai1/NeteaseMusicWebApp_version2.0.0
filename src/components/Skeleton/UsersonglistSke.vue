<template>
  <!-- 左侧用户歌单栏 -->
  <el-skeleton 
  :loading="load" 
  animated 
  style="width:100%"
  >
    <template slot="template">
      <el-skeleton-item variant="text" style="width:100%; height: 50px;" v-for="i in 6" :key="i" />
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

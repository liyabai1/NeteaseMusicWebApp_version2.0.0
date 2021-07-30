<template>
  <div >
    <recom-mv :mvList="mvlist">
      <div>加载中....</div>
    </recom-mv>
  </div>
</template>
<script>
import RecomMv from "@/components/HomePage/FindPage/RecomMv"
export default {
  data(){
    return {
      
    }
  },
  props: {
    mvlist: Array
  },
  components: {
    RecomMv
  },
  mounted(){

  },
  methods: {
    
  },
  
}
</script>
<style lang="scss" scoped>
</style>
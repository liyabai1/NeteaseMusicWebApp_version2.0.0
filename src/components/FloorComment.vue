<template>
  <div>楼层评论{{id}}</div>
</template>
<script>
export default {
  data(){
    return {}
  },
  props: {
    id: [Number,String]
  },
  mounted(){
    console.log("刷新",this.id)
  }
}
</script>
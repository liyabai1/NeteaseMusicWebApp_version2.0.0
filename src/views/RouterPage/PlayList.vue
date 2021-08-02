<template>
  <div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      listId: null
    }
  },
  mounted () {
    console.log(this.$route.params.listId)
  },
  beforeRouteUpdate: function (to,from,next) {
    if (to.params.listId !== from.params.listId) {
      next();
      this.listId = to.params.listId
    }
  },
  computed: {
   
  }
}
</script>
<template>
  <div class="BodyerBox">
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import SideBar from '@/views/Bodyer/SideBar'
export default {
  data () {
    return {

    }
  },
  components: {
    SideBar
  },
  computed: {
    path: function () {
      return this.$store.path
    }
  }
}
</script>
<style lang="scss" scoped>
.BodyerBox {
  flex: 1;
  height: 0;
  display: flex;
}
</style>

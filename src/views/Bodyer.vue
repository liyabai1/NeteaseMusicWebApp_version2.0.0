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
  }
}
</script>
<style lang="scss" scoped>
.BodyerBox {
  flex: 1;
  display: flex;
}
</style>

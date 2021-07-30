<template>
  <div class="mainContainer">
    <top-navbar></top-navbar>
    <div class="homeMainBox">
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import TopNavbar from '@/components/HomePage/TopNavBar'
export default {
  data () {
    return {}
  },
  components: {
    TopNavbar
  }
}
</script>
<style lang="scss" scoped>
.mainContainer {
  display: flex;
  width: 100%;
  flex-direction: column;
  .homeMainBox {
    flex: 1;
    overflow: auto;
    & > div {
      width: 1100px;
      height: 100%;
      margin: auto;
    }
    &::-webkit-scrollbar {
      width: 6px;
      opacity: 0;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #444;
      border-radius: 3px;
    }
  }
}
</style>

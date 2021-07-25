<template>
  <div id="app">
    <header-box></header-box>
    <bodyer-box></bodyer-box>
    <footer-box></footer-box>
  </div>
</template>
<script>
import HeaderBox from '@/views/Header'
import BodyerBox from '@/views/Bodyer'
import FooterBox from '@/views/Footer'
export default {
  date () {
    return {}
  },
  components: {
    HeaderBox,
    BodyerBox,
    FooterBox
  }
}
</script>
<style lang="scss">
/** 引入主题 */
@include theme();

* {
  margin: 0px;
  padding: 0px;
  border: none;
  list-style: none;
}
html {
  width: 100%;
  height: 100%;
  font-size: $html-font-size;
}
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 16px;
}
</style>

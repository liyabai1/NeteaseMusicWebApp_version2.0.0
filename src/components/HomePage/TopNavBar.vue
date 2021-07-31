<template>
  <nav>
    <router-link tag="div" to="findmusic" active-class="linkActive">个性推荐</router-link>
    <router-link tag="div" to="songlist" active-class="linkActive">精品歌单</router-link>
    <router-link tag="div" to="rank" active-class="linkActive">排行榜</router-link>
    <router-link tag="div" to="newmusic" active-class="linkActive">最新音乐</router-link>
  </nav>
</template>
<style lang="scss" scoped>
nav {
  display: flex;
  height: 65px;
  align-items: center;
  margin-left: 20px;
  div {
    width: 100px;
    height: 100%;
    line-height: 65px;
    background-color: #ffffff;
    margin-right: 20px;
    text-align: center;
    cursor: pointer;
  }
}
.linkActive {
  font-weight: 1000;
  box-sizing: border-box;
  border-bottom: 2px solid indianred;
}
</style>
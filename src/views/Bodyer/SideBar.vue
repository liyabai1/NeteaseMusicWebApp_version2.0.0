<template>
  <div class="siderBarBox">
    <router-link tag="li" to="/home" active-class="selected">发现音乐</router-link>
    <router-link tag="li" to="/fm" active-class="selected">私人FM</router-link>
    <router-link tag="li" to="/mv" active-class="selected">MV</router-link>
    <div class="userSongList" v-show="hasLogin">
      <user-songlist></user-songlist>
    </div>
  </div>
</template>
<script>
import UserSonglist from "@/views/Bodyer/UserSonglist"
export default {
  data(){
    return{
      
    }
  },
  components:{
    UserSonglist
  },
  computed:{
    hasLogin:function(){
      return this.$store.state.login.userInfo.hasLogin
    }
  },
}
</script>
<style lang="scss" scoped>
.siderBarBox {
  width: 200px;
  height: 100%;
  border-right: 2px solid #aaaaaa;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #444;
    border-radius: 3px;
  }
  & > li {
    list-style: none;
    height: 40px;
    width: 175px;
    line-height: 40px;
    border-radius: 5px;
    margin-left: 10px;
    padding: 5px;
    cursor: pointer;
  }
}
.selected {
  font-size: 16px;
  font-weight: bold;
  background-color: #aaaaaa55;
}
</style>

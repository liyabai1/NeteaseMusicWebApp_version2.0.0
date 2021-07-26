<template>
  <div class="userSonglist">
    <p>创建的歌单</p>
    <usersonglist-ske :load="loading">
      <router-link
      tag="div"
      class="listNameBox"
      active-class="linkActive"
      v-for="items in getCreatList(songlistData)"
      :key="items.id"
      :to="{name: 'playlist',params:{listId:items.id}}">
        <i class="iconfont">&#xe610;</i>
        <span>{{items.name}}</span>
      </router-link>
    </usersonglist-ske>
    <p>收藏的歌单</p>
    <usersonglist-ske :load="loading">
      <router-link
      tag="div" 
      class="listNameBox"
      active-class="linkActive"
      v-for="items in getCollList(songlistData)"
      :key="items.id"
      :to="{name: 'playlist' ,params:{listId:items.id}}">
        <i class="iconfont">&#xe610;</i>
        <span>{{items.name}}</span>
      </router-link>
    </usersonglist-ske>
  </div>
</template>
<script>
import UsersonglistSke from "@/components/Skeleton/UsersonglistSke"
export default {
  data(){
    return{
      songlistData: this.$store.state.login.userList
    }
  },
  components:{
    UsersonglistSke
  },
  methods:{
    /**
     * 获取用户歌单
     */
    getUserSongList(){
      console.log("执行")
      this.$store.dispatch("login/getUserSongList")
    },

    /**
     * 提取用户创建的歌单
     */
    getCreatList(allList){
      return allList.filter(item=> item.creatorId === this.$store.state.login.userInfo.userId)
    },

    /**
     * 提取用户收藏的歌单
     */
    getCollList(allList){
      return allList.filter(item=> item.creatorId !== this.$store.state.login.userInfo.userId)
    }
  },
  filters:{
    
  },
  computed:{
    loading: function (){
      // return false
      return !this.$store.state.login.userInfo.hasLogin
    }
  },
  watch:{
    // 监听用户是否登录，如果登录则请求用户的歌单数据
    loading: function (newV,oldV){
      console.log(newV,oldV)
      if (newV || oldV){
        this.getUserSongList()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.userSonglist {
  width: 100%;
  height: auto;
  & > p {
    display: block;
    width: 175px;
    margin-left: 10px;
    margin: 10px {
      right: 0px;
      left: 0px;
    }
  }
  .listNameBox {
    width: 175px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 5px;
    & > i {
      margin-left: 2px;
    }
    & > span {
      display: inline-block;
      height: 50px;
      width: 150px;
      padding: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.linkActive {
  font-size: 16px;
  font-weight: bold;
  background-color: #aaaaaa55;
}
</style>

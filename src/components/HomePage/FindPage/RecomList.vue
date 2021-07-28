<template>
  <div class="recomListContainer">
    <div
    class="itemList"
    v-for="item in recomList"
    :key="item.listId"
    >
      <div class="imgBox">
        <el-image :src="item.picUrl" lazy></el-image>
        <div class="playCountBox">
          <i class="iconfont">&#xed2e;</i>
          <div class="playCount">{{item.playCount}}</div>
        </div>
      </div>
      <div class="listTitle">{{item.listName}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      recomList: this.$store.state.home.recomList
    }
  },
  mounted () {
    if (this.$store.state.home.recomList.length === 0) {
      if (localStorage.getItem('userId')) { // 如果用户已经登录
        this.$store.dispatch('getRecomList')
      } else { // 用户没有登录
        this.$store.dispatch('getRecomListNL')
      }
    }
  },
  computed: {
    hasLogin: function () {
      return this.$store.state.login.userInfo.hasLogin
    }
  },
  watch: {
    hasLogin: function (newV) {
      if (newV) {
        this.$store.dispatch('getRecomList')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.recomListContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .itemList {
    width: 210px;
    height: auto;
    cursor: pointer;
    margin: 0px {
      top: 5px;
      left: 55px;
    }

    .imgBox {
      width: 210px;
      height: 210px;
      position: relative;
      & > .el-image {
        position: absolute;
        width: 210px;
        height: 210px;
        border-radius: 5px;
      }
      & > .playCountBox {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #8f8f8f;
        background-image: linear-gradient(to bottom, #ffffffff, #ffffff00);
        & > .playCount {
          display: inline-block;
        }
      }
    }

    .listTitle {
      width: 100%;
      height: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      -moz-box-orient: vertical;
      font-size: 12px;
      line-height: 20px;
      margin-top: 5px;
    }
  }
}
</style>

<template>
  <div class="preRank">
    <el-image 
    :src='rankList.picUrl'
    lazy
    style="width:170px;height:170px"></el-image>
    <div class="rankList">
      <li
      class="item"
      v-for="(item,index) in rankList.tracks"
      :key="item.first">
        <span>{{++index}}</span>
        <span>{{item.first}}</span>
        <span>{{item.second}}</span>
      </li>
      <p @click="goPlayList(rankList.listId)">查看全部 > </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rankList: Object
  },
  methods: {
    goPlayList: function (listId) {
      this.$router.push({name: "playlist", params: {listId: listId}})
    }
  }
}
</script>
<style lang="scss" scoped>
.preRank {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  .el-image {
    margin: 0px {
      right: 20px;
      left: 20px;
    }
    border-radius: 10px;
  }
  .rankList {
    // height: 70px;
    // width: 100%;
    flex: 1;
    & > p {
      cursor: pointer;
    }
    .item {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      display: flex;
      &:nth-child(odd) {
        background-color: #d6d6d6;
      }
      & > span {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      & > span:nth-of-type(1) {
        width: 60px;
        text-align: center;
        color: #acacac;
      }
      & > span:nth-of-type(2) {
        flex: 1;
      }
      & > span:nth-of-type(3) {
        width: 200px;
        text-align: end;
        color: #acacac;
      }
    }
  }
}
</style>
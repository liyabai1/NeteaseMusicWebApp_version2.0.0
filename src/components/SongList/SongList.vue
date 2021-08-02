<template>
  <div class="listBox">
    <div
    class="item"
    v-for="item in songList"
    :key="item.listId"
    @click="navToListInfo(item.listId)">
      <span class="imageBox">
        <el-image
        :src="item.picUrl"
        style="width:60px;height:60px"></el-image>
      </span>
      <span class="listName">{{item.listName}}</span>
      <span class="trackCount">{{item.trackCount}}首</span>
      <span class="creator">by{{item.creator}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    songList: Array
  },
  methods: {
    navToListInfo: function (listId) {
      this.$router.push({ name: 'playlist', params: { listId: listId } })
    }
  }

}
</script>
<style lang="scss" scoped>
.listBox {
  width: 100%;
  .item {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    & > span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &:nth-of-type(odd) {
      background-color: #efefef;
    }
    .imageBox {
      width: 100px;
      margin-left: 50px;
      .el-image {
        margin: auto;
      }
    }
    .listName {
      width: toRem(300px);
      min-width: 300px;
    }
    .trackCount {
      width: toRem(120px);
      min-width: 120px;
    }
    .creator {
      width: toRem(250px);
      min-width: 250px;
    }
  }
}
</style>

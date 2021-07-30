<template>
  <div class="listContainer">
    <div
    class="itemBox"
    v-for="item in hqList"
    :key="item.listId">
      <div class="contentBox">
        <div
        class="imgBox"
        @click="goListInfo(item.listId)">
          <el-image
          :src="item.picUrl"
          style="width:170px;height:170px"
          lazy></el-image>
          <div class="playCount">
            <i class="iconfont">&#xed2e;</i>
            <span>{{item.playCount | changeView}}</span>
          </div>
        </div>
        <div class="info">
          <div class="title overflow">{{item.listName}}</div>
          <div class="creator overflow">by {{item.creator}}</div>
          <div class="copywriter">
            <span class="tag">{{item.tag}}</span>
            <span class="content overflow">{{item.copywriter}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { changePlaycount } from '@/module/changePlaycount.js'
export default {
  props: {
    hqList: Array
  },
  methods: {
    /**
     * 跳转到歌单详情页
     */
    goListInfo: function (listId) {
      this.$router.push({ name: 'playlist', params: { listId: listId } })
    }
  },
  filters: {
    changeView: function (playCount) {
      return changePlaycount(playCount)
    }
  }
}
</script>
<style lang="scss" scoped>
.listContainer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .itemBox {
    width: 530px;
    height: 170px;
    margin-bottom: 30px;
    .contentBox {
      width: 480px;
      height: 170px;
      display: flex;
      align-items: center;
      .imgBox {
        width: 170px;
        height: 170px;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        .playCount {
          position: absolute;
          top: 0px;
          height: 16px;
          width: 100%;
          line-height: 16px;
          color: #e7e7e7;
          background-image: linear-gradient(to bottom, #000000aa, #02020200);
          text-align: end;
          & > span {
            padding-right: 10px;
          }
        }
      }
      .info {
        flex: 1;
        width: 0;
        margin-left: 5px;
        .title {
          height: 40px;
          line-height: 40px;
          font-size: 20px;
          font-weight: 500;
        }
        .creator {
          font-size: 14px;
          color: #7c7c7c;
          height: 30px;
          line-height: 30px;
        }
        .copywriter {
          color: #bdbdbd;
          height: 16px;
          margin-top: 15px;
          overflow: hidden;
          display: flex;
          & > span {
            display: inline-block;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
          }
          & > .tag {
            width: auto;
            border: 1px solid red;
            box-sizing: border-box;
            border-radius: 2px;
            color: red;
            margin: 0px {
              right: 5px;
              left: 5px;
            }
          }
          & > .content {
            flex: 1;
          }
        }
      }
    }
  }
}
.overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

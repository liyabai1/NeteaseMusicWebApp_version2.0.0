<template>
  <div class="personContainer">
    <div class="scrollContainer">
      <div
      class="itemBox"
      v-for="item in personList"
      :key="item.MvId"
      :style="{width: imgWidth}">
        <router-link
        tag="div"
        :to="{name: 'mvDetail',params: {MvId: item.MvId}}">
          <div class="imgBox">
            <el-image
            :src="item.picUrl"
            :style="{width: imgWidth,height: imgHeight }"
            lazy></el-image>
            <i class="iconfont">&#xe667;</i>
          </div>
          <div class="title">{{item.title}}</div>
        </router-link>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    personList: Array,
    imgWidth: String,
    imgHeight: String
  },
  mounted () {

  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
.personContainer {
  width: 100%;

  .scrollContainer {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .itemBox {
      margin-bottom: 10px;
      cursor: pointer;
      margin: 5px;
      .imgBox {
        position: relative;
        top: 0px;
        & > i {
          position: absolute;
          top: 5%;
          left: 3%;
          font-size: 30px;
          color: #eeeeee;
        }
        .el-image {
          top: 0px;
          border-radius: 5px;
        }
      }
      .title {
        margin-top: 5px;
        display: -webkit-box;
        width: 100%;
        height: 30px;
        line-height: 15px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }
}
</style>

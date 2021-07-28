<template>
  <div class="personContainer">
    <div class="contextBox" 
    v-infinite-scroll="load" 
    style="overflow:auto"
    :infinite-scroll-distance="100"
    :infinite-scroll-delay="500">
      <div class="title">独家放送</div>
      <personalized
      :personList="personList"
      :imgWidth="'356px'"
      :imgHeight="'133px'"
      ></personalized>
    </div>
  </div>
</template>
<script>
import Personalized from "@/components/HomePage/FindPage/Personalized"
import HTTPS from "@/util/http.js"
export default {
  data(){
    return {
      personList: [],
      offsetPage: 1,
      limit: 60
    }
  },
  mounted(){
    // // 首次加载  element-UI 会自动首次加载
    // this.load()
  },
  methods: {
    load: function () {
      // 给用户提示加载中
      this.$message({
        message: "正在加载中...",
        center: true
      })
      /**
       * 获取独家放送
       */
      let _this = this;
      HTTPS.getPersonaList(this.limit,(this.offsetPage-1)*this.limit)
        .then(
          res => {
            console.log(res.data)
            if (res.data.code === 200) {
              res = res.data.result
              /** 所需的字段 */
              /** MVId | MVId */
              /** 封面  | picUrl */
              /** 标题  | title */
              res.forEach( item => {
                // 获取的独家放送有MV和视频两种类型，视频类型的id字段为videoId,
                if (item.id === 0) {
                  item.id = item.videoId
                }
                let temp = {
                  MvId: item.id,
                  picUrl: item.picUrl,
                  title: item.name
                }
                _this.personList.push(temp)
              })
              // 改变offsetPage 为下次做准备
              _this.offsetPage ++
            } else {
              this.$message({
                message: "获取数据失败",
                type: "warning"
              })
            }
          },
          err => {
            console.error(err)
            this.$message({
              message: "获取数据失败",
              type: "warning"
            })
          }
        )
    }
  },
  components: {
    Personalized
  }

}
</script>
<style lang="scss" scoped>
.personContainer {
  height: 100%;
  width: 100%;
  .contextBox {
    width: 1100px;
    height: 100%;
    margin: auto;
    &::-webkit-scrollbar {
      width: 6px;
      opacity: 0;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #444;
      border-radius: 3px;
    }
    .title {
      height: 80px;
      line-height: 80px;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
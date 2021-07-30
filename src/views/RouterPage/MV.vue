<template>
  <div 
  class="MVcontainer"
  v-infinite-scroll="loadMvList" 
  :infinite-scroll-delay="500"
  style="overflow:auto;overflow-x:hidden">
    <h3>全部MV</h3>
    <div class="topType">
      <div class="areaBox">
        <div>地区: </div>
        <div
        class="areaItem"
        v-for="item in area"
        :key="item"
        @click="selectArea($event.target)">{{item}}</div>
      </div>
      <div class="typeBox">
        <div>类型: </div>
        <div
        class="typeItem"
        v-for="item in type"
        :key="item"
        @click="selectType($event.target)">{{item}}</div>
      </div>
      <div class="orderBox">
        <div>排序方式: </div>
        <div
        class="orderItem"
        v-for="item in order"
        :key="item"
        @click="selectOrder($event.target)">{{item}}</div>
      </div>
    </div>
    <mv-list :mvlist="mvList"></mv-list>
  </div>
</template>
<script>
import MvList from "@/views/RouterPage/MV/MvList"
import { MV } from '@/module/mutation-name.js'
export default {
  data(){
    return {
      // 地区
      area: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      // 类型
      type: ["全部", "官方版", "原生", "现场版", "网易出品"],
      // 排序 
      order: ["上升最快", "最热", "最新"],
      page: 1,
      limit: 30
    }
  },
  mounted (){
    // 选择标签样式初始化
    this.selectArea(document.querySelector(".areaItem"))
    this.selectType(document.querySelector(".typeItem"))
    this.selectOrder(document.querySelector(".orderItem"))
  },
  methods: {
    // 选择区域
    selectArea: function (elArea) {
      // 获取之前的标签，便于判断是否点击了别的标签，如果点击了别的需要进行搜索
      let oldArea = this.$store.state.mv.nowArea;
      [...elArea.parentElement.children].forEach(item => item.classList.remove("active"))
      elArea.classList.add("active")
      let clickArea = elArea.innerText;
      this.$store.commit(MV.SET_TAG_AREA, clickArea)
      oldArea !== clickArea && this.$store.dispatch('getMvList',{push:false})
    },
    // 选择类型
    selectType: function (elType) {
      let oldType = this.$store.state.mv.nowType;
      [...elType.parentElement.children].forEach(item => item.classList.remove("active"))
      elType.classList.add("active")
      let clickType = elType.innerText
      this.$store.commit(MV.SET_TAG_TYPE, clickType)
      oldType !== clickType && this.$store.dispatch('getMvList',{push:false})
    },
    // 选择排序方式
    selectOrder: function (elOrder) {
      let oldOrder = this.$store.state.mv.nowOrder;
      [...elOrder.parentElement.children].forEach(item => item.classList.remove("active"))
      elOrder.classList.add("active")
      let clickOrder = elOrder.innerText
      this.$store.commit(MV.SET_TAG_ORDER, clickOrder)
      oldOrder !== clickOrder && this.$store.dispatch('getMvList',{push:false})
    },

    loadMvList: function () {
      // 初始的count 为null  则进行初始搜索
      if (this.count) {
        // 在进行判断是否搜索到底了
        console.log(this.mvList.length,this.count)
        if (this.mvList.length <= this.count) {
          this.$store.dispatch('getMvList', { push: true, offset: (this.page-1)*this.limit, limit: this.limit })
          ++this.page;
        } else {
          this.$message({
            message: "我是有底线的！🤪",
            type: "",
            center: true
          })
        }
      } else {
        this.$store.dispatch('getMvList',{ push: false, offset: (this.page-1)*this.limit, limit: this.limit })
        ++this.page;
      }
    }
  },
  components:{
    MvList
  },
  computed: {
    // mvList 数据
    mvList: function () {
      return this.$store.state.mv.mvList
    },
    // count MV数量
    count: function () {
      return this.$store.state.mv.count
    }
  }
}
</script>
<style lang="scss" scoped>
.MVcontainer {
  width: 1100px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #444;
    border-radius: 3px;
  }
  h3 {
    height: 50px;
    line-height: 50px;
  }
  .topType {
    color: #c0c0c0;
    font-size: 12px;
    .areaBox,
    .typeBox,
    .orderBox {
      height: 20px;
      margin-bottom: 10px;
      & > div:nth-of-type(1) {
        display: inline-block;
        width: 80px;
      }
      .areaItem,
      .typeItem,
      .orderItem {
        display: inline-block;
        width: 90px;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
  }
}
.active {
  background: #fcebeb;
  color: red;
  border-radius: 10px;
}
</style>

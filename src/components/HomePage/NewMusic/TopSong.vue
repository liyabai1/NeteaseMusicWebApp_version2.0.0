<template>
  <div>
    <nav class="topNav">
      <span
      ref="typeDom"
      v-for="item in type"
      :key="item.id"
      @click="changeType($event.target, item.id)">{{item.name}}</span>
    </nav>
    <div class="listBox">
      <topsong-list :listData="topSongList"></topsong-list>
    </div>
  </div>
</template>
<script>
import TopsongList from "./TopsongList"
export default {
  data() {
    return {
      type: [
        {id: 0, name: "全部"},
        {id: 7, name: "华语"},
        {id: 96, name: "欧美"},
        {id: 8, name: "日本"},
        {id: 16, name: "韩国"},
      ],
      nowType: 0
    }
  },
  components: {
    TopsongList
  },
  mounted(){
    // 初始化样式
    this.changeType(this.$refs.typeDom[0],0)
    // 初始化搜索结果
    this.$store.dispatch("getNewMusic",0)
  },
  methods: {
    changeType: function (el, typeId) {
      // 改变样式
      this.$refs.typeDom.forEach( item => item.classList.remove("selected") )
      el.classList.add("selected")
      // 判断是否点击了新的标签
      if (typeId !== this.nowType) {
        this.$store.dispatch("getNewMusic",typeId)
        this.nowType = typeId
      }
    }
  },
  computed: {
    topSongList: function () {
      return this.$store.state.nm.topSongList
    }
  }
}
</script>
<style lang="scss" scoped>
.topNav {
  width: 100%;
  height: 50px;
  & > span {
    display: inline-block;
    width: 100px;
    height: 100%;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    margin-right: 15px;
    &:hover {
      color: indianred;
    }
  }
}
.selected {
  color: #f01e1e;
  font-weight: bold;
}
</style>
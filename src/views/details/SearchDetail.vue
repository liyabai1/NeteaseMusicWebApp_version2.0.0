<template>
  <div class="searchDetail">
    <nav class="typeNav">
      <router-link 
      v-for="item in types"
      :key="item.type"
      tag="span" 
      :to="{name: item.routerName, params: {keywords: keywords}}" 
      active-class="selected">{{item.name}}</router-link>
    </nav>
    <div :key="keywords">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      types: [
        {type: 1, name: "单曲", routerName: "serSong"},
        // {type: 10, name: "专辑"},
        // {type: 100, name: "歌手"},
        {type: 1000, name: "歌单", routerName: 'serplaylist'},
        // {type: 1002, name: "用户"},
        {type: 1014, name: "视频", routerName: 'sermv'},
        // {type: 1006, name: "歌词"},
      ]
    }
  },
  mounted(){
    // console.log("关键词为：",this.keywords)
  },
  methods: {
  },
  computed: {
    // 当前的搜索关键词
    keywords: function () {
      return this.$store.state.search.keywords
    }
  },
  watch: {
    
  }
}
</script>
<style lang="scss" scoped>
.searchDetail {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #444;
    border-radius: 3px;
  }
}
p {
  font-weight: bold;
}
.typeNav {
  height: 50px;
  display: flex;
  margin-left: 30px;
  & > span {
    display: inline-block;
    width: 75px;
    height: 100%;
    line-height: 50px;
    margin-right: 20px;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: indianred;
    }
  }
}
.selected {
  color: red;
  font-size: 18px;
  font-weight: bolder;
}
</style>
import HTTPS from '@/util/http.js'
import { HOME_LIST } from '@/module/mutation-name.js'

const homeSonglist = {
  nemespace: true,
  state: {
    // 精品歌单标签列表
    listTag: [],
    // 当前标签
    nowTag: '全部',
    // 精品歌单信息
    hqList: [],
    // 当前标签下的歌单总数
    total: 99999
  },
  mutations: {

    /**
     * 精品歌单标签
     */
    [HOME_LIST.SET_SONG_TAG] (state, tags) {
      // console.log(tags)
      // 对标签进行重排
      const listTag = [
        {
          type: 0,
          category: '语种',
          tags: []
        },
        {
          type: 1,
          category: '风格',
          tags: []
        },
        {
          type: 2,
          category: '场景',
          tags: []
        },
        {
          type: 3,
          category: '情感',
          tags: []
        },
        {
          type: 4,
          category: '主题',
          tags: []
        }
      ]
      tags.forEach(item => {
        switch (item.category) {
          case 0 :
            listTag[0].tags.push(item)
            break
          case 1 :
            listTag[1].tags.push(item)
            break
          case 2 :
            listTag[2].tags.push(item)
            break
          case 3 :
            listTag[3].tags.push(item)
            break
          case 4 :
            listTag[4].tags.push(item)
            break
        }
      })
      state.listTag = listTag
    },

    /**
     * 改变当前精品歌单的标签
     */
    [HOME_LIST.CHANGE_NOW_TAG] (state, nowTag) {
      state.nowTag = nowTag
    },

    /**
     * 重置total字段，因为后续需要用数量来判断是否应该继续请求
     */
    [HOME_LIST.INIT_TOTAL] (state) {
      state.total = 99999
    },

    /**
     * 精品歌单列表信息
     */
    [HOME_LIST.SET_SONG_LIST] (state, data) {
      // 设置当前歌单总数
      state.total = data.hqListInfo.total
      // console.log(data.cat)
      const tempData = []
      // 提取歌单所需字段
      /** 歌单id     | listId     */
      /** 歌单标题    | listName   */
      /** 封面图片    | picUrl     */
      /** 播放量      | playCount  */
      /** 创建人      | creator    */
      /** updateTime | updateTime */
      /** 标签        | tag        */
      /** 子标题      | copywriter */
      data.hqListInfo.playlists.forEach(item => {
        const tempListinfo = {
          listId: item.id,
          listName: item.name,
          picUrl: item.coverImgUrl,
          playCount: item.playCount,
          creator: item.creator.nickname,
          updateTime: item.updateTime,
          tag: item.tag,
          copywriter: item.copywriter
        }
        tempData.push(tempListinfo)
      })
      // 如果当前获取的数据内容与当前标签一致，则push进数组，否则替换
      data.cat === state.nowTag ? state.hqList = [...state.hqList, ...tempData] : state.hqList = tempData
      // 先进行搜索，因为store中会判断当前是否更换了新标签
      // 更改标签
      this.commit(HOME_LIST.CHANGE_NOW_TAG, data.cat)
    }
  },
  actions: {
    /**
     * 获取精品歌单标签列表
     */
    getPlaylistTag: function (store) {

      HTTPS.getListTag()
        .then(
          res => {
            if (res.data.code === 200) {
              // console.log(res.data)
              store.commit(HOME_LIST.SET_SONG_TAG, res.data.tags)
            } else {
              console.error("获取精品歌单标签失败",res)
            }
          },
          err => {
            console.error("获取精品歌单标签失败",err)
          }
        )
    },

    /**
     * 获取精品歌单列表
     */
    getHqList: function (store, { cat, limit }) {
      if (store.state.hqList.length === 0 || cat !== store.state.nowTag) {
        HTTPS.getHighQualityList(cat, limit, null)
          .then(
            res => {
              if (res.data.code === 200) {
                console.log(res.data)
                store.commit(HOME_LIST.SET_SONG_LIST, { hqListInfo: res.data, cat: cat })
              } else {
                console.error("加载精品歌单列表失败")
              }
            },
            err => {
              // console.error(err)
              console.error("加载精品歌单列表失败",err)
            }
          )
      } else {
        const hqList = store.state.hqList
        HTTPS.getHighQualityList(cat, limit, hqList[hqList.length - 1].updateTime)
          .then(
            res => {
              if (res.data.code === 200) {
                store.commit(HOME_LIST.SET_SONG_LIST, { hqListInfo: res.data, cat: cat })
              } else {
                console.error("加载精品歌单列表失败".res)
              }
            },
            err => {
              console.error("加载精品歌单列表失败",err)
            }
          )
      }
    }
  }
}
export default homeSonglist

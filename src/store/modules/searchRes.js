/** 搜索结果 */


import HTTPS from '@/util/http.js'
import { SEARCH_RES } from '@/module/mutation-name.js'
const search = {
  namespace: true,
  state: {
    // 当前的搜索类型
    type: {
      type: 1,
      name: '全部'
    },
    // 搜索关键词
    keywords: '',
    // 搜索单曲的结果
    songCount: null,
    searchResSong: [],
    songLoading: true,
    // 搜索mv的结果
    mvCount: null,
    searchResMv: [],
    mvLoading: true,
    // 搜索歌单的结果
    listCount: null,
    searchResList: [],
    listLoading: true
  },
  mutations: {
    // 重置搜索类型
    [SEARCH_RES.SET_TYPE] (state, type) {
      state.type = type
    },
    // 设置当前的搜索关键词
    [SEARCH_RES.SET_KEYWORDS] (state, keywords) {
      state.keywords = keywords
    },
    // 设置当前单曲的加载状态
    [SEARCH_RES.SET_SONGLOADING] (state, status) {
      state.songLoading = status
    },
    // 设置搜索单曲的结果
    [SEARCH_RES.SET_SEAR_SONG] (state, resData) {
      console.log(resData)
      // 设置单曲的搜索结果数量
      resData.result.songCount && (state.songCount = resData.result.songCount)
      // 清空之前的搜索结果
      state.searchResSong = []
      /** 单曲列表所需要的字段 */
      /** 歌曲Id  | songId   */
      /** 歌曲封面 | picUrl   */
      /** 歌名    | songName */
      /** 歌手    | singer   */
      /** 专辑名称 | album    */
      /** 歌曲时长 | songTime */
      /** 是否可听 | fee      */
      resData.result.songs.forEach(item => {
        const tempData = {
          songId: item.id,
          picUrl: null,
          songName: item.name,
          singer: item.artists.map(item => item.name).join('/'),
          album: item.album.name,
          songTime: item.duration,
          fee: item.fee
        }
        state.searchResSong.push(tempData)
      })
      this.commit(SEARCH_RES.SET_SONGLOADING, false)
    },

    // 设置MV搜索状态
    [SEARCH_RES.SET_MVLOADING] (state, status) {
      state.mvLoading = status
    },
    // 设置Mv搜索结果
    [SEARCH_RES.SET_SEAR_MV] (state, mvData) {
      mvData.result.videoCount && (state.mvCount = mvData.result.videoCount)
      // 清空之前的搜索结果
      state.searchResMv = []
      /** MV所需字段 */
      /** MVId | MvId   */
      /** 封面  | picUrl */
      /** 标题  | title  */
      /** 类型  | type */
      mvData.result.videos.forEach(item => {
        const tempData = {
          MvId: item.vid,
          picUrl: item.coverUrl,
          title: item.title,
          type: item.type  /** 此处所有的类型都为5 */
        }
        state.searchResMv.push(tempData)
      })
      this.commit(SEARCH_RES.SET_MVLOADING, false)
    },

    // 设置歌单的搜索状态
    [SEARCH_RES.SET_LISTLOADING] (state, status) {
      state.listLoading = status
    },
    // 设置歌单的搜索结果
    [SEARCH_RES.SET_SEAR_LIST] (state, listData) {
      listData.result.playlistCount && (state.listCount = listData.result.playlistCount)
      // 清空之前的搜索结果
      state.searchResList = []
      listData.result.playlists.forEach(item => {
        /** 歌单需要的字段 */
        /** 歌单id   | listId    */
        /** 歌单标题  | listName  */
        /** 封面图片  | picUrl    */
        /** 播放量    | playCount */
        /** 创建人    | creator    */
        /** 歌曲数量  |  trackCount */
        const tempData = {
          listId: item.id,
          listName: item.name,
          picUrl: item.coverImgUrl + '?param=150y150',
          playCount: item.playCount,
          creator: item.creator.nickname,
          trackCount: item.trackCount
        }
        state.searchResList.push(tempData)
      })
      this.commit(SEARCH_RES.SET_LISTLOADING, false)
    }
  },
  actions: {
    /** 搜索关键词 */
    search: async function (store, { keywords, limit, offset, type }) {
      const search = await new Promise((resolve, reject) => {
        HTTPS.search(keywords, limit, offset, type)
          .then(
            res => {
              if (res.data.code === 200) {
              // console.log(res.data)
                resolve(res.data)
              } else {
                console.error('搜索失败', res)
                reject(res)
              }
            },
            err => {
              console.error('搜索失败', err)
              reject(err)
            }
          )
      })
      if (search.code === 200) {
        // 如果搜索的是单曲
        Number(type) === 1 && store.commit(SEARCH_RES.SET_SEAR_SONG, search)
        // 搜索视频
        Number(type) === 1014 && store.commit(SEARCH_RES.SET_SEAR_MV, search)
        // 搜索歌单
        Number(type) === 1000 && store.commit(SEARCH_RES.SET_SEAR_LIST, search)
      }
    }
  }
}

export default search

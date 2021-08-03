/***  歌单信息模块 */
import HTTPS from '@/util/http.js'
import { PLAYLIST } from '@/module/mutation-name.js'
const pl = {
  state: {
    // 当前的listId
    listId: null,
    // 歌单信息
    listInfo: {
      /**
       * 这两种错误的原因可能是因为程序初始的时候是没有这两个属性，为undefined，
       * undefined 类型的数据没有map 方法和 join方法，
       * 因此在初始化的是否加上这两个属性，并且设置为 array 类型， (数组类型有map 方法  和 join 方法)
       * 就可以避免报错，不过不加也不会影响使用
       */
      tracks: [],  // 不设置会报 map is undefined 的错误 ，但是不会影响程序运行
      tags: [],    // 不设置会报 join  的错误，也不影响运行， 
    },
    // 歌单是否正在加载
    listLoading: true
  },
  mutations: {
    // 设置当前的Id信息
    [PLAYLIST.SET_LISTID] (state,listId) {
      state.listId = listId
    },
    // 歌单信息
    [PLAYLIST.SET_PLAYLIST_INFO] (state, playlistData) {
      console.log(playlistData.tags)
      let tempData = {
        name: playlistData.name,
        coverImgUrl: playlistData.coverImgUrl,
        avatarUrl: playlistData.creator.avatarUrl,
        nickname: playlistData.creator.nickname,
        createTime: playlistData.createTime,
        tags: playlistData.tags,
        trackCount: playlistData.trackCount,
        playCount: playlistData.playCount,
        description: playlistData.description,
        tracks: playlistData.tracks
      }
      state.listInfo = tempData
    },
    // 设置歌曲详情
    [PLAYLIST.SET_SONG_INFO] (state, songinfo) {
      state.listInfo.tracks = songinfo
    },
    // 设置歌单加载状态
    [PLAYLIST.SET_LISTLOAD_STATUS] ( state, status) {
      state.listLoading = status
    }
  },
  actions: {
    // 获取歌单信息
    getListInfo: async function (store,{listId, cookie}) {
      store.commit(PLAYLIST.SET_LISTLOAD_STATUS, true)
      let playListIds = await new Promise( (resolve, reject) => {
        HTTPS.playListInfo(listId,cookie)
        .then( res => {
          if (res.data.code === 200) {
            store.commit( PLAYLIST.SET_PLAYLIST_INFO, res.data.playlist )
            // 返回Ids
            resolve(res.data.playlist.trackIds.map(item=> item.id).join(","))
          }
        })
        .catch( err => console.error("请求歌单信息失败",err))
      })
      // 请求歌曲详情
      this.dispatch("getSongInfo",playListIds)
    },

    // 获取歌曲详情
    getSongInfo: function (store,ids) {
      HTTPS.getSongInfo(ids)
        .then( res => {
          if (res.data.code === 200) {
            store.commit(PLAYLIST.SET_SONG_INFO, res.data.songs)
            store.commit(PLAYLIST.SET_LISTLOAD_STATUS, false)
          }
        })
        .catch( err => console.error("获取歌曲详情失败：",err))
    }
  }
}
export default pl
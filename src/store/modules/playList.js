/***  歌单信息模块 */
import HTTPS from '@/util/http.js'
import { PLAYLIST } from '@/module/mutation-name.js'
const pl = {
  state: {
    // 当前的listId
    listId: null,
    // 歌单信息
    listInfo: {},
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
      state.listInfo = playlistData
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
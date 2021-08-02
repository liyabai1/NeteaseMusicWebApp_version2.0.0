/***  歌单信息模块 */
import HTTPS from '@/util/http.js'
import { PLAYLIST } from '@/module/mutation-name.js'
const pl = {
  state: {
    // 当前的listId
    listId: null
  },
  mutations: {},
  actions: {
    getListInfo: function (store,listId) {
      HTTPS.playListInfo(listId)
        .then( res => {
          if (res.data.code === 200) {
            store.commit( PLAYLIST.SET_PLAYLIST_INFO, res.data.playlist )
          }
        })
        .catch( err => console.error("请求歌单信息失败",err))
    }
  }
}
export default pl
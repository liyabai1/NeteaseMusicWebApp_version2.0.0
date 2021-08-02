/** 首页最新音乐 */

import HTTPS from '@/util/http.js'
import { newMusic } from '@/module/mutation-name.js'
const newmusic = {
  namesapce: true,
  state: {
    topSongList: []
  },
  mutations: {},
  actions: {
    // 获取最新音乐的请求在home.js中
  }
}
export default newmusic
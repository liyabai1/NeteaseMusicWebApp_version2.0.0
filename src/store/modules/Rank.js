import HTTPS from '@/util/http.js'
import { RANK } from '@/module/mutation-name.js'
const rank = {
  namespace: true,
  state: {
    rankData: []
  },
  mutations: {
    [RANK.SET_RANK] (state, rankData) {
      rankData = rankData.slice(0,4)
      /** 所需的字段信息 */
      /** 歌单ID  | listId */
      /** 封面图片 | picUrl */
      /** 前三首信息 | tracks */
      let temp = []
      rankData.forEach( item => {
        let tempData = {
          listId: item.id,
          picUrl: item.coverImgUrl + "?param=170y170",
          tracks: item.tracks
        }
        temp.push(tempData)
      })
      state.rankData = temp
    }
  },
  actions: {

    /** 请求数据 */
    getRankData: function (store) {
      HTTPS.getRank()
        .then(
          res => {
            if (res.data.code === 200) {
              console.log(res.data)
              store.commit(RANK.SET_RANK, res.data.list)
            } else {
              console.error("请求排行榜数据失败",err)
            }
          },
          err => {
            console.error("请求排行榜数据失败",err)
          }
        )
    }
  }
}
export default rank
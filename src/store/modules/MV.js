import HTTPS from '@/util/http.js'
import { MV } from '@/module/mutation-name.js'
const MVPAGE = {
  namespace: true,
  state: {
    // 当前选择的地区标签
    nowArea: "全部",
    // 当前选择的类型标签
    nowType: "全部",
    // 当前选择的排序标签
    nowOrder: "上升最快",
    // MV列表
    mvList: [],
    // 当前标签下的mv数量
    count: null
  },
  mutations: {
    // 设置当前的地区标签 nowArea {string}
    [MV.SET_TAG_AREA] (state, nowArea) {
      state.nowArea = nowArea
    },
    // 设置当前的类型标签 nowType {string}
    [MV.SET_TAG_TYPE] (state, nowType) {
      state.nowType = nowType
    },
    // 设置当前的排序标签 nowOrder {string}
    [MV.SET_TAG_ORDER] (state, nowOrder) {
      state.nowOrder = nowOrder
    },

    /** 设置MV列表数据 */
    [MV.SET_MV_LIST] (state, data) {
      // 设置count数量  第二页的数据中没有count这个字段  有hasmore {boolean}
      data.mvList.count && (state.count = data.mvList.count)
      let tempData = []
      /** 设置mvList 所需的字段 */
      /** MVid   | MvId      */
      /** 封面图片 | picUrl    */
      /** 标题    | title     */
      /** MV作者  | artistName*/
      /** 播放量  | playCount */
      data.mvList.data.forEach( item => {
        let tempMv = {
          MvId: item.id,
          picUrl: item.cover + "?param=313y176",
          title: item.name,
          artistName: item.artistName,
          playCount: item.playCount
        }
        tempData.push(tempMv)
      })
      // 如果push为真，则需要将新请求的数组添加进原数组
      data.push ? state.mvList = [...state.mvList,...tempData] : state.mvList = tempData
    }
  },
  actions: {
    // 参数push 判断是否需要将获取的数据push进原数据
    getMvList: function (store,{ push,offset = 0, limit = 30}) {
      let area = store.state.nowArea
      let type = store.state.nowType
      let order = store.state.nowOrder
      HTTPS.getMvList(area, type, order, offset, limit)
        .then(
          res => {
            if (res.data.code === 200) {
              store.commit(MV.SET_MV_LIST,{ mvList:res.data,push})
            } else {
              console.error("获取MV列表数据失败",res)
            }
          },
          err => {
            console.error("获取MV列表数据失败",err)
          }
        )
    }
  }
}

export default MVPAGE
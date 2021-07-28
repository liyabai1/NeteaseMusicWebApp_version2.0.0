import HTTPS from '@/util/http.js'
import { HOME } from '@/module/mutation-name.js'

const homeModule = {
  namespace: true,
  state: {
    // 轮播图数据
    banner: [],
    // 推荐歌单数据  可能是登录的歌单数据，也可能是未登录的歌单数据
    recomList: [],
    // 推荐歌单是否正在请求
    recomListLoading: false
  },
  mutations: {
    /**
     * 轮播图数据
     */
    [HOME.SET_BANNER_DATA] (state, bannerData) {
      bannerData = bannerData.banners
      // console.log(bannerData)
      bannerData.forEach(item => {
        const tempBanner = {
          imageUrl: item.imageUrl
        }
        state.banner.push(tempBanner)
      })
    },

    /**
     * 推荐歌单数据 未登录状态
     */
    [HOME.SET_RECOM_LIST] (state, recomList) {
      console.log(recomList.result)
      recomList = recomList.result
      const temp = []
      /** 歌单需要的字段 */
      /** 歌单id   | listId */
      /** 歌单标题  | listName */
      /** 封面图片  | picUrl */
      /** 播放量    | playCount */
      recomList.forEach(item => {
        const tempList = {
          listId: item.id,
          listName: item.name,
          picUrl: item.picUrl,
          playCount: item.playCount
        }
        temp.push(tempList)
      })
      state.recomList = temp
    },

    /**
     * 推荐歌单数据  登录状态
     */
    [HOME.SET_RECOM_LIST_LOGIN] (state, recomList) {
      console.log(recomList.recommend)
      recomList = recomList.recommend
      const temp = []
      recomList.forEach(item => {
        const tempList = {
          listId: item.id,
          listName: item.name,
          picUrl: item.picUrl,
          playCount: item.playcount
        }
        temp.push(tempList)
      })
      state.recomList = temp
    },

    /**
     * 设置推荐歌单的请求状态
     */
    [HOME.SET_RECOM_REQUEST_STATUS] (state, data) {
      state.recomListLoading = data
    }
  },
  actions: {

    /**
     * 获取banner轮播图
     */
    getBanner: function (store) {
      HTTPS.getBannerData()
        .then(
          (res) => {
          // console.log("轮播图response",res.data)
            if (res.data.code === 200) {
              store.commit(HOME.SET_BANNER_DATA, res.data)
            }
          },
          (err) => {
            console.error(err)
          }
        )
    },

    /**
     * 获取推荐歌单  未登录状态
     */
    getRecomListNL: function (store) {
      // 正在请求中
      store.commit(HOME.SET_RECOM_REQUEST_STATUS, true)
      HTTPS.getRecomListNotLogin()
        .then(
          res => {
            if (res.data.code === 200) {
              store.commit(HOME.SET_RECOM_LIST, res.data)
            }
            store.commit(HOME.SET_RECOM_REQUEST_STATUS, false)
          },
          err => {
            console.error(err)
            store.commit(HOME.SET_RECOM_REQUEST_STATUS, false)
          }
        )
    },

    /**
     * 用户已登录获取的推荐歌单
     */
    getRecomList: function (store) {
      // 正在请求中
      store.commit(HOME.SET_RECOM_REQUEST_STATUS, true)
      const cookie = localStorage.getItem('cookie')
      HTTPS.getRecomList(cookie)
        .then(
          res => {
            if (res.data.code === 200) {
              store.commit(HOME.SET_RECOM_LIST_LOGIN, res.data)
            }
            store.commit(HOME.SET_RECOM_REQUEST_STATUS, false)
          },
          err => {
            console.error(err)
            store.commit(HOME.SET_RECOM_REQUEST_STATUS, false)
          }
        )
    }
  }
}

export default homeModule

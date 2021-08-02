/** 首页发现模块 */


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
    recomListLoading: false,
    // 首页的独家放送入口数据
    personalizedData: [],
    // 首页的独家放送是否正在请求
    personLoading: true,
    // 最新音乐
    newMusic: [],
    // 首页推荐mv
    homeRecomMv: []
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
      /** 歌单id   | listId    */
      /** 歌单标题  | listName  */
      /** 封面图片  | picUrl    */
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
      recomList.splice(7)
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
    },

    /**
     * 首页独家放松数据
     */
    [HOME.SET_HOME_PERSONALIZED] (state, personData) {
      // console.log("首页独家放送数据",personData)
      /** 所需的字段 */
      /** MVId | MvId   */
      /** 封面  | picUrl */
      /** 标题  | title  */
      personData.forEach(item => {
        const tempPerson = {
          MvId: item.id,
          picUrl: item.picUrl,
          title: item.name
        }
        state.personalizedData.push(tempPerson)
      })
      state.personLoading = false
    },

    /**
     * 最新音乐歌单
     */
    [HOME.SET_NEW_MUSIC] (state, newMusicData) {
      const tempData = []
      /** 需要的字段 */
      /** 歌曲Id  | songId   */
      /** 歌曲封面 | picUrl   */
      /** 歌名    | songName */
      /** 歌手    | singer   */
      /** 专辑名称 | album    */
      /** 歌曲时长 | songTime */
      /** 是否可听 | fee      */
      newMusicData.forEach(item => {
        const tempSongInfo = {
          songId: item.id,
          picUrl: item.album.picUrl + '?param=100y100', // 将图片大小缩小
          songName: item.name,
          singer: item.artists.map(i => i.name).join('/'),
          album: item.album.name,
          songTime: item.duration,
          fee: item.fee
        }
        tempData.push(tempSongInfo)
      })
      // 首页的最新音乐数据
      state.newMusic = tempData
      // 最新音乐页的最新音乐数据
      this.state.nm.topSongList = tempData
    },

    /**
     * 首页推荐MV
     */
    [HOME.SET_HOME_RECOMMV] (state,recomMv) {
      let tempData = [];
      /** 需要的字段 */
      /** MVid   | MvId      */
      /** 封面图片 | picUrl    */
      /** 标题    | title     */
      /** MV作者  | artistName*/
      /** 播放量  | playCount */
      recomMv.forEach( item => {
        let tempMv = {
          MvId: item.id,
          picUrl: item.picUrl + "?param=313y176",
          title: item.name,
          artistName: item.artistName,
          playCount: item.playCount
        }
        tempData.push(tempMv)
      })
      state.homeRecomMv = tempData
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
    },

    /**
     * 获取首页独家放送数据
     */
    getPersonData: function (store) {
      HTTPS.getPersonalized()
        .then(
          res => {
            if (res.data.code === 200) {
              store.commit(HOME.SET_HOME_PERSONALIZED, res.data.result)
            } else {
              console.error("获取首页独家放送失败",res)
            }
          },
          err => {
            console.error("获取首页独家放送失败",err)
          }
        )
    },

    /**
     * 获取最新音乐
     */
    getNewMusic: function (store, type) {
      HTTPS.getNewMusic(type)
        .then(
          res => {
            if (res.data.code === 200) {
              // console.log(res.data)
              store.commit(HOME.SET_NEW_MUSIC, res.data.data)
            } else {
              console.error("获取最新音乐失败",res)
            }
          },
          err => {
            console.error("获取最新音乐失败",err)
          }
        )
    },

    /**
     * 获取推荐MV  ****首页****
     */
     getRecomMV: function (store){
       HTTPS.getRecomMv()
        .then(
          res => {
            if (res.data.code === 200) {
              console.log(res.data)
              store.commit(HOME.SET_HOME_RECOMMV,res.data.result)
            } else {
              console.error("获取首页推荐MV失败",res)
            }
          },
          err => {
            console.error("获取首页推荐MV失败",err)
          }
        )
     }
  }
}

export default homeModule

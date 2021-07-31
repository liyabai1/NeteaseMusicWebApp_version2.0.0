import { GET_DATA } from '@/util/getData.js'

/**
 * 用户登录
 * @param {number} phoneNum
 * @param {string} passwords
 */
function login (phone, password) {
  return GET_DATA({
    url: '/login/cellphone',
    params: { phone: phone, password: password }
  })
}

/**
 * 获取用户歌单
 * @param {string} userId
 */
function getUserlist (userId) {
  return GET_DATA({
    url: '/user/playlist',
    params: { uid: userId }
  })
}

/**
 * 获取banner轮播图
 */
function getBannerData () {
  return GET_DATA({
    url: '/banner',
    params: {
      type: 0
    }
  })
}

/**
 * 获取推荐歌单  未登录状态下
 */
function getRecomListNotLogin () {
  return GET_DATA({
    url: '/personalized',
    params: {
      limit: 8
    }
  })
}

/**
 * 获取推荐歌单  登录状态下  需要用户在登录状态下
 */
function getRecomList (cookie) {
  return GET_DATA({
    url: '/recommend/resource',
    params: {
      cookie: cookie
    }
  })
}

/**
 * 获取首页独家放送 （只有三个数据）
 */
function getPersonalized () {
  return GET_DATA({
    url: '/personalized/privatecontent'
  })
}

/**
 * 获取独家放送列表
 * @param {number | string} limit
 * @param {number | string} offset
 * @returns
 */
function getPersonaList (limit, offset) {
  return GET_DATA({
    url: '/personalized/privatecontent/list',
    params: {
      limit: limit,
      offset: offset
    }
  })
}

/**
 * 获取最新音乐
 * @param {string | number} type 地区： 全部:0 华语:7 欧美:96 日本:8 韩国:16
 * @returns
 */
function getNewMusic (type) {
  return GET_DATA({
    url: '/top/song',
    params: {
      type: type
    }
  })
}

/**
 * 获取推荐Mv   ********首页*********
 * @returns
 */
function getRecomMv () {
  return GET_DATA({
    url: '/personalized/mv'
  })
}

/**
 * 获取精品歌单标签列表
 */
function getListTag () {
  return GET_DATA({
    url: '/playlist/highquality/tags'
  })
}

/**
 * 获取精品歌单信息
 * @param {string} type  类型标签
 * @param {number | string} limit 每页的数量
 * @param {number | string} before 分页用，取上一页最后一个的updateTime
 */
function getHighQualityList (type, limit, before) {
  if (before) {
    return GET_DATA({
      url: '/top/playlist/highquality',
      params: {
        cat: type,
        limit: limit,
        before: before
      }
    })
  } else {
    return GET_DATA({
      url: '/top/playlist/highquality',
      params: {
        cat: type,
        limit: limit
      }
    })
  }
}

/**
 * 
 * @param {string} area 地区 全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param {string} type  类型 全部,官方版,原生,现场版,网易出品
 * @param {string} order 排序 上升最快,最热,最新,不填则为上升最快
 * @param {number | string} offset 分页 (页数 -1)*limit 
 * @param {number | string} limit  每页的数量
 * @returns 
 */
function getMvList(area,type,order,offset,limit) {
  return GET_DATA({
    url: '/mv/all',
    params: {
      area: area,
      order: order,
      type: type,
      limit: limit,
      offset: offset
    }
  })
}

/** 获取首页排行榜信息 */
function getRank(){
  return GET_DATA({
    url: "/toplist/detail"
  })
}


const HTTPS = {
  login,
  getUserlist,
  getBannerData,
  getRecomListNotLogin,
  getRecomList,
  getPersonalized,
  getPersonaList,
  getNewMusic,
  getRecomMv,
  getListTag,
  getHighQualityList,
  getMvList,
  getRank
}
export default HTTPS

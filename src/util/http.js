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

const HTTPS = {
  login,
  getUserlist,
  getBannerData,
  getRecomListNotLogin,
  getRecomList,
  getPersonalized,
  getPersonaList,
  getNewMusic
}
export default HTTPS

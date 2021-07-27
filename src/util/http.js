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
function getUserlist(userId){
  return GET_DATA({
    url: '/user/playlist',
    params: {uid: userId}
  })
}

/**
 * 获取banner轮播图
 */
function getBannerData(){
  return GET_DATA({
    url: "/banner",
    params: {
      type: 0
    }
  })
}

/**
 * 获取推荐歌单  未登录状态下
 */
function getRecomListNotLogin(){
  return GET_DATA({
    url: '/personalized'
  })
}

/**
 * 获取推荐歌单  登录状态下  需要用户在登录状态下
 */
function getRecomList(cookie){
  return GET_DATA({
    url: "/recommend/resource",
    params: {
      cookie: cookie
    }
  })
}

const HTTPS = {
  login,
  getUserlist,
  getBannerData,
  getRecomListNotLogin,
  getRecomList
}
export default HTTPS

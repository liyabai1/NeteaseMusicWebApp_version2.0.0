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

const HTTPS = {
  login,
  getUserlist
}
export default HTTPS

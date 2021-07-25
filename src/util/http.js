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

const HTTPS = {
  login: login
}
export default HTTPS

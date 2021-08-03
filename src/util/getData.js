import axios from 'axios'
import { api } from '@/util/api.js'

/**
 *
 */
export const GET_DATA = axios.create({
  baseURL: api,
  timeout: 10000
})
// 添加请求拦截器
GET_DATA.interceptors.request.use(function (config) {
  // console.log('正在请求')
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
GET_DATA.interceptors.response.use(function (response) {
  // console.log('请求成功', response)
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.log('请求错误', error)
  return Promise.reject(error)
})

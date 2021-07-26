import Vue from 'vue'
import Vuex from 'vuex'

// 导入登录模块
import loginModule from './modules/login.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login:loginModule
  }
})

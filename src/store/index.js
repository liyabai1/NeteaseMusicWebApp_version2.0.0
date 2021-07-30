import Vue from 'vue'
import Vuex from 'vuex'


import loginModule from './modules/login.js'
import homeModule from './modules/home.js'
import homeSonglist from'./modules/homeSongList.js'
import Mv from './modules/MV.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    login:loginModule,
    home: homeModule,
    homeSonglist: homeSonglist,
    mv: Mv
  }
})

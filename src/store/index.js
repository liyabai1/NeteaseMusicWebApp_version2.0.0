import Vue from 'vue'
import Vuex from 'vuex'

import { ROOT } from '@/module/mutation-name.js'

import loginModule from './modules/login.js'
import homeModule from './modules/home.js'
import homeSonglist from'./modules/homeSongList.js'
import Mv from './modules/MV.js'
import rank from './modules/Rank.js';
import newMusic from "./modules/newMusic.js"
import search from "./modules/searchRes.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: "red",
    path: ""
  },
  mutations: {
    // 改变主题
    [ROOT.CHANGE_THEME] (state, themeName) {
      state.theme = themeName
    }
  },
  actions: {
  },
  modules: {
    login:loginModule,
    home: homeModule,
    homeSonglist: homeSonglist,
    mv: Mv,
    rank: rank,
    nm: newMusic,
    search: search
  }
})

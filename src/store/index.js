import Vue from 'vue'
import Vuex from 'vuex'

import HTTPS from '@/util/http.js'
import { ROOT } from '@/module/mutation-name.js'

import loginModule from './modules/login.js'
import homeModule from './modules/home.js'
import homeSonglist from'./modules/homeSongList.js'
import Mv from './modules/MV.js'
import rank from './modules/Rank.js';
import newMusic from "./modules/newMusic.js"
import search from "./modules/searchRes.js"
import pl from './modules/playList.js'
import video from './modules/video.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: "red",
    path: "",
    // 音乐播放器
    musicplayer: new Audio(),
    // 当前播放歌曲的id
    musicInfo: {
      id: null,
      picUrl: null,
      songName: null,
      singer: null
    },
    // 歌词
    lyric: '',
    // 歌词ID === 歌曲id 用于判断是否需要获取数据
    lyricId: 0
  },
  mutations: {
    // 改变主题
    [ROOT.CHANGE_THEME] (state, themeName) {
      state.theme = themeName
    },
    // 设置当前音乐的播放列表
    [ROOT.CHANGE_MUSIC] (state,{musicId,picUrl,songName,singer}) {
      state.musicInfo = {
        id: musicId,
        picUrl: picUrl,
        songName: songName,
        singer: singer
      }
    },
    
    // 设置图片
    [ROOT.SET_PLAYMUSIC_PICURL] (state,picUrl) {
      state.musicInfo.picUrl = picUrl
    },

    [ROOT.SET_LRC] (state, lrcData) {
      state.lyric = lrcData;
      state.lyricId = state.musicInfo.id
    }
  },
  actions: {
    // 获取歌曲详情，只为显示一张图片  艹 fuck  
    // 已经有一个getSongInfo的函数了，为了区分设置了后缀 _ ，否则会同时执行这两个函数
    getSongInfo_: function (store,id) {
      HTTPS.getSongInfo(id)
      .then( res => {
        if (res.data.code === 200) {
          store.commit(ROOT.SET_PLAYMUSIC_PICURL, res.data.songs[0].al.picUrl)
        }
      })
      .catch( err => console.error(err) )
    },

    /**
     * 获取歌词
     */
     getLyric: function (store) {
       HTTPS.getLrc(store.state.musicInfo.id)
       .then( res => {
        res.data.code === 200 
          ? store.commit(ROOT.SET_LRC, res.data.lrc.lyric)
          : console.error("获取歌词失败：",res)
       })
       .catch( err => console.error("获取歌词失败",err) )
     }
  },
  modules: {
    login:loginModule,
    home: homeModule,
    homeSonglist: homeSonglist,
    mv: Mv,
    rank: rank,
    nm: newMusic,
    search: search,
    pl: pl,
    video: video
  }
})

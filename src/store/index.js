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

import { toLrcArr, stringToHex } from "@/module/fun.js"

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
    lyric: [{time:0,ctx:""}],
    // 歌词ID === 歌曲id 用于判断是否需要获取数据
    lyricId: 1
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
      if (lrcData === "暂无歌词") {
        state.lyric = [
          {time:0,ctx:"轻音乐",hex: "aa"},
          {time:0,ctx:"暂无歌词",hex: "bb"}
        ]
      } else {
        state.lyric = toLrcArr(lrcData);
        state.lyric.forEach( item=> {
          item.hex = stringToHex(item.ctx + item.time)
        })
      }
      state.lyricId = state.musicInfo.id + 1
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
        if (res.data.code === 200){
          if (res.data.nolyric){
            store.commit( ROOT.SET_LRC, "暂无歌词" )
          } else {
            store.commit(ROOT.SET_LRC, res.data.lrc.lyric)
          }
        } else {
          console.log("获取歌词失败：",res)
        } 
       })
       .catch( err => console.error("获取歌词失败",err) )
     }
  },
  getters: {
    // lrcArr: state => {
    //   let lrc = state.lyric;
    //   if (!!lrc) {
    //     let reg = /\[\d{2,}:\d{2,}.\d{2,}\]/g
    //     let tiemArr = lrc.match(reg)
    //     let ctxArr = lrc.split(reg).splice(1)
    //     tiemArr = tiemArr.map( item => {
    //       let reg = /(?!=\])\d{2,}:\d{2,}.\d{2,}(?!=\])/g
    //       let time = item.match(reg)[0]
    //       let min = time.split(":")[0]
    //       let sec = time.split(":")[1]
    //       let ms = ((Number(min)*60 + Number(sec))*1000).toFixed(0)
    //       return ms
    //     })
    //     let lrcArr = tiemArr.map( (item,index)=>{
    //       return {
    //         time: item,
    //         ctx: ctxArr[index]
    //       }
    //     })
    //     return lrcArr
    //   } 
    // }
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

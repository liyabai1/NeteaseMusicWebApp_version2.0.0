import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/RouterPage/Home'
import PrivateFm from '@/views/RouterPage/PrivateFm'
import PlayList from '@/views/RouterPage/PlayList'
import MV from '@/views/RouterPage/MV'

// 详请页
import PersonalizedDetail from "@/views/details/PersonalizedDetail"
import MvDetail from "@/views/details/MvDetail"
import SearchDetail from "@/views/details/SearchDetail"

// 首页路由页面
import FindMusic from "@/views/RouterPage/Home/FindMusic"
import SongList from "@/views/RouterPage/Home/SongList"
import Rank from "@/views/RouterPage/Home/Rank"
import NewMusic from "@/views/RouterPage/Home/NewMusic"

// 搜索页面
import SearchSong from "@/views/RouterPage/Search/SearchSong"
import SearchPlaylist from "@/views/RouterPage/Search/SearchPlaylist"
import SearchMv from "@/views/RouterPage/Search/SearchMv"



Vue.use(VueRouter)

/** 解决重复指向同一路由报错问题 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/home',
    component: Home,
    children:[
      {
        path: "findmusic",
        component:FindMusic
      },
      {
        path: "songlist",
        name: 'homeSonglist',
        component: SongList
      },
      {
        path: "rank",
        component: Rank
      },
      {
        path: "newmusic",
        name: 'newMusic',
        component: NewMusic
      },
      {
        path: "",
        redirect: "findmusic"
      }
    ]
  },
  {
    path: '/fm',
    component: PrivateFm
  },
  {
    path: '/mv',
    name: "mv",
    component: MV
  },
  {
    path: '/playlist/:listId',
    name: 'playlist',
    component: PlayList
  },
  {
    path: '/personalized',
    name: 'personalized',
    component: PersonalizedDetail
  },
  {
    path: '/mvdetail/:MvId',
    name: "mvDetail",
    component: MvDetail
  },
  {
    path: "/search",
    name: "search",
    component: SearchDetail,
    children: [
      {
        path: "/search/song/:keywords",
        name: "serSong",
        component: SearchSong
      },
      {
        path: "/search/songlist/:keywords",
        name: "serplaylist",
        component: SearchPlaylist
      },
      {
        path: "/search/songmv/:keywords",
        name: "sermv",
        component: SearchMv
      },
      {
        path: '',
        redirect: "serSong"
      }
    ]
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/RouterPage/Home'
import PrivateFm from '@/views/RouterPage/PrivateFm'
import PlayList from '@/views/RouterPage/PlayList'
import MV from '@/views/RouterPage/MV'

// 首页路由页面
import FindMusic from "@/views/RouterPage/Home/FindMusic"
import SongList from "@/views/RouterPage/Home/SongList"
import Rank from "@/views/RouterPage/Home/Rank"
import NewMusic from "@/views/RouterPage/Home/NewMusic"

Vue.use(VueRouter)

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
        component: SongList
      },
      {
        path: "rank",
        component: Rank
      },
      {
        path: "newmusic",
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
    component: MV
  },
  {
    path: '/playlist/:listId',
    component: PlayList
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

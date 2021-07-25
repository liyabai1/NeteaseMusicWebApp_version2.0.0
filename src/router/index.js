import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/RouterPage/Home'
import PrivateFm from '@/views/RouterPage/PrivateFm'
import PlayList from '@/views/RouterPage/PlayList'
import MV from '@/views/RouterPage/MV'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home
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

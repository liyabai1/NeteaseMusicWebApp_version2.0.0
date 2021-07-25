import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { setRootRem } from './module/setRootRem'

setView()
// 获取当前屏幕的宽度
function setView () {
  const screenWidth = document.documentElement.clientWidth
  const rootRem = setRootRem(1022, 16, screenWidth)
  document.documentElement.style.fontSize = rootRem + 'px'
}
window.onresize = function () {
  setView()
}

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

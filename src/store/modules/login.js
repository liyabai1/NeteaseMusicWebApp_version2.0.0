import HTTPS from '@/util/http.js'
import { LOGIN } from "@/module/mutation-name.js"
const loginModule = {
  namespaced: true,
  state: {
    // 用户信息
    userInfo: {
      hasLogin: false
    },
    // 用户歌单
    userList:[]         
  },
  mutations: {

    // 将用户的登录信息保存在userInfo中
    [LOGIN.SET_USER_INFO] (state,data){
      state.userInfo = data
      state.userInfo.hasLogin = true
    },

    // 保存用户歌单userList
    [LOGIN.SET_USER_LIST] (state,data){
      data = data.playlist;
      // 对用户歌单的有用信息进行筛选
      /** 
       * 包含信息
       * 歌单Id | id
       * 歌单名称 | name
       * 创建人id | creatorId  主要用来区分是否为创建歌单和收藏歌单
       */ 
      data.forEach(item=>{
        let tempItem = {
          id: item.id.toString(),
          name: item.name.toString(),
          creatorId: item.creator.userId.toString(),
        }
        state.userList.push(tempItem)
      })
    }
  },
  actions: {

    /**
     * 获取用户歌单
     */
    getUserSongList(store){
      let userId = store.state.userInfo.userId
      HTTPS.getUserlist(userId)
      .then(
      (res)=>{
        store.commit(LOGIN.SET_USER_LIST,res.data)
      },
      (err)=>{
        this.$message({
          message: `获取歌单失败。状态码：${err.status}`,
          type: "warning"
        })
      })
      
    } 
  }
}
export default  loginModule
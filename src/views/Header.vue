<template>
  <div class="headerBox" :data-theme="theme">
    <img
    class="logoImg"
    src="../../public/logo.jpg"
    alt="Logo"
    />

    <span class="weclome">Hello!</span>
    <div class="navToPage">
      <i 
      class="iconfont"
      @click="navBack()">&#xe620;</i>
      <i 
      class="iconfont"
      @click="navNext()">&#xe629;</i>
    </div>
    <div class="searchContainer">
      <div class="inputBox">
        <i class="iconfont">&#xe61e; </i>
        <input
          type="text"
          placeholder="搜索"
          @focus="inputFouces = true"
          @blur="inputFouces = false"
          @keydown.enter="search()"
          v-model.trim="keyWords"
          v-popover:historyContainer/>
        <!-- 搜索历史弹出框 -->
        <el-popover
        ref="historyContainer"
        placement="bottom"
        width="400"
        trigger="click"
        :visible-arrow="false">
          <div class="historyBox">
            <p>搜索历史记录</p>
            <ul>
              <li
              v-for="item in history"
              :key="item">
                <span @click="searchByHis(item)">{{item}}</span>
                <i 
                class="iconfont"
                @click="delHistoryItem(item)">&#xe7a5;</i>
              </li>
            </ul>
          </div>
        </el-popover>
      </div>
    </div>

    <!-- 用户信息|头像、用户名 -->
    <div class="userBox"  @click="login()">
      <img
      :src="avatarUrl"
      v-if="logined" />
      <i
      class="iconfont"
      v-else>&#xe65f;</i>
      <span class="userName">{{ userName }}</span>
    </div>

    <!-- 主题选择 -->
    <div class="changeThemeBox">
      <i
      class="iconfont changeThemeBtn"
      @click="viewTheme = !viewTheme"
      v-popover:themeContainer
      >&#xe7c0;</i>
      <!-- 主题弹出框 -->
      <el-popover
      ref="themeContainer"
      placement="bottom"
      width="400"
      trigger="click"
      :visible-arrow="true">
        <div class="themeBox">
          <span
          v-for="item in themeColor"
          :key="item.name"
          :style="{ background: item.color }"
          @click="changeTheme($event.target,item.name)">
            <i class="iconfont noshow" ref="activeColor">&#xe60a;</i>
          </span>
        </div>
      </el-popover>
    </div>

    <!-- 登录框 -->
    <el-dialog
      title="登录"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div class="inputContainer">
        <p>手机号</p>
        <input
          class="inputPhone"
          type="text"
          placeholder="请输入手机号"
          v-model.trim="phoneNum"
        />
        <p>密码</p>
        <input
          class="inputPassword"
          type="password"
          placeholder="密码"
          v-model="passwords"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toLogin()">登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import HTTPS from '@/util/http.js'
import { getCookieInvalidTime } from '@/module/cookie.js'
import { LOGIN,ROOT,SEARCH_RES } from '@/module/mutation-name.js'
export default {
  data () {
    return {
      // 搜索历史的显示
      inputFouces: false,
      // 搜索关键词
      keyWords: '',
      // 搜索历史记录
      history: [],
      // 用户是否登录
      logined: false,
      // 用户名
      userName: '未登录',
      // 用户头像
      avatarUrl: null,
      // 显示主题选择框
      viewTheme: false,
      // 弹出登录框
      centerDialogVisible: false,
      // 输入的手机号
      phoneNum: null,
      // 输入的密码
      passwords: null,
      // 主题选择
      themeColor: [
        {name:'red',color: '#fd544e'},
        {name:'green',color: '#2bb669'},
        {name:'blue',color: '#4791eb'},
        {name:'yellow',color: '#e2ab12'},
        {name:'black',color: '#363636'},
        {name: "pink",color: '#fa5793'}
      ]
    }
  },
  mounted () {
    // 判断用户是否已经登录
    // 依据locationStoring中的cookieInvalid的值判断
    const cookieTime = localStorage.getItem('cookieInvalid')
    if (cookieTime) {
      cookieTime > new Date().getTime() && this.renderUserInfo()
      cookieTime > new Date().getTime() || this.delLocationStoring()
    }

    // 首次获取历史搜索，并将其写入页面
    let hisSet = this.getSearchHistory()
    this.history = [...hisSet]

    // 初始化主题选择
    // console.log(this.$refs.activeColor[0].parentElement)
    this.changeTheme(this.$refs.activeColor[0].parentElement,"red")
  },
  methods: {
    // 点击用户信息登录
    login () {
      // 判断当前用户是否已经登录
      // 没有登录则弹出登录框
      if (!this.logined) {
        this.centerDialogVisible = true
      } else {
        alert('您已经登录了')
      }
    },

    /**
     * 登录
     */
    toLogin () {
      var _this = this
      // 检查输入的格式
      if (!this.phoneNum) {
        alert('请输入手机号')
        return
      }
      if (!this.passwords) {
        alert('请输入密码')
        return
      }
      const regPhone = /[0-9]{11}/g
      if (regPhone.test(this.phoneNum)) {
        /**
         * 登录逻辑
         * 将用户的头像，用户名等信息储存在本地缓存中
         * 每次进如页面时判断cookie是否失效，如果失效了，删除本地缓存的用户信息
         */
        (async () => {
          _this.$message('正在登录...')
          const res = await HTTPS.login(_this.phoneNum, _this.passwords).then((res) => {
            // 登录成功
            if (res.data.code === 200) {
              _this.$message({
                message: '登录成功',
                type: 'success',
                center: true
              })
              return res.data
            } else {
              _this.$message({
                message: `登录失败：${res.data.message}`,
                type: 'warning',
                center: true
              })
            }
          }, (err) => {
            return err
          })

          // 如果有数据返回，则设置用户信息到缓存中
          if (res) {
            // 保存用户的头像链接
            localStorage.setItem('avatarUrl', res.profile.avatarUrl)
            // 保存用户的用户名
            localStorage.setItem('nickName', res.profile.nickname)
            // 保存用户Id
            localStorage.setItem('userId', res.profile.userId)
            // 保存cookie
            localStorage.setItem('cookie', res.cookie)
            // 保存cookie的失效日期
            localStorage.setItem('cookieInvalid', getCookieInvalidTime(res.cookie))
            // 渲染用户信息到页面
            _this.renderUserInfo()
          }
        })()
      } else {
        alert('请检查手机号格式')
        return
      }
      this.centerDialogVisible = false
    },

    /**
     * 用户登录信息存在，渲染用户信息
     */
    renderUserInfo () {
      this.logined = true
      this.userName = localStorage.getItem('nickName')
      this.avatarUrl = localStorage.getItem('avatarUrl')

      // 将用户信息保存在loginModule模块中
      const userInfo = {
        userName: localStorage.getItem('nickName'),
        userId: localStorage.getItem('userId'),
        avatarUrl: localStorage.getItem('avatarUrl')
      }
      this.$store.commit(`login/${LOGIN.SET_USER_INFO}`, userInfo)
    },

    /**
     * 用户登录已失效，删除用户的信息
     */
    delLocationStoring () {
      localStorage.removeItem('nickName')
      localStorage.removeItem('avatarUrl')
      localStorage.removeItem('userId')
      localStorage.removeItem('cookie')
    },

    /**
     * 用户点击回车开始搜索
     */
    search () {
      // 验证用户的搜索关键词 不能为空
      if (!this.keyWords) {
        return null;
      }
      // 设置state的搜索关键词
      this.$store.commit(SEARCH_RES.SET_KEYWORDS,this.keyWords)
      // 跳转到搜索结果页面
      this.$router.push({name: "serSong", params: {keywords: this.keyWords} })
      this.addHistrory(this.keyWords)
    },

    // 获取搜索历史记录
    getSearchHistory () {
      let strHis = localStorage.getItem("searchHistory")
      if (strHis) {
        return new Set(JSON.parse(strHis))
      }
      return new Set()
    },

    // 记录用户搜索历史，保存在缓存中
    addHistrory (keyWords) {
      // 首先获取用户记录
      let hisSet = this.getSearchHistory()
      // 添加记录
      hisSet.add(keyWords)
      // 将set转为json字符串形式
      let hisStr = JSON.stringify([...hisSet])
      localStorage.setItem("searchHistory",hisStr)
      this.history = [...hisSet]
    },

    // 删除当前历史记录
    delHistoryItem(item){
      // 首先获取用户记录
      let hisSet = this.getSearchHistory()
      // 添加记录
      hisSet.delete(item)
      // 将set转为json字符串形式
      let hisStr = JSON.stringify([...hisSet])
      localStorage.setItem("searchHistory",hisStr)
      this.history = [...hisSet]
    },

    // 从历史记录里面搜索
    searchByHis(item) {
      this.keyWords = item;
      this.search()
    },

    // 改变主题
    changeTheme(el,themeName){
      [...this.$refs.activeColor].forEach( item => item.classList.add("noshow"))
      el.children[0].classList.remove("noshow")
      el.children[0].classList.add("show")
      // 更改state 中的主题
      this.$store.commit(ROOT.CHANGE_THEME,themeName)
    },

    //页面后退
    navBack() {
      window.history.back()
    },
    // 页面前进
    navNext() {
      window.history.forward()
    }
  },
  computed: {
    theme: function (){
      return this.$store.state.theme
    }
  }
}
</script>
<style lang="scss" scoped>
.headerBox {
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #aaaaaa;
  box-sizing: border-box;

  /* logo的图片 */
  .logoImg {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-left: toRem(20px);
  }

  /* logo旁边的欢迎语 */
  .weclome {
    font-size: 20px;
    align-self: flex-end;
    margin-left: toRem(5px);
  }

  /* 两个小按钮控制页面的前进与后退 */
  .navToPage {
    width: 60px;
    height: 27px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 70px;

    i {
      font-size: 20px;
      color: #aaaaaa;
      &:hover {
        cursor: pointer;
        color: #eeeeee;
      }
    }
  }

  /* 搜索盒子 */
  .searchContainer {
    width: 400px;
    height: 30px;
    margin-left: toRem(15px);

    /* 搜索框 */
    .inputBox {
      display: flex;
      width: 400px;
      height: 30px;
      border-radius: 15px;
      align-items: center;
      background-color: #ffffff;

      i {
        font-size: 16px;
      }
      input {
        width: 370px;
        height: 30px;
        font-size: 16px;
        border: none;
        outline: none;
        background: #ffffff;
      }
    }
  }

  /** */
  .userBox {
    width: 170px;
    height: 35px;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: toRem(400px);
    i{
      border-radius: 50%;
      color: #cccccc;
      font-size: 30px;
    }
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      color: #cccccc;
      font-size: 30px;
    }

    .userName {
      width: 125px;
      height: 25px;
      line-height: 25px;
      font-size: 16px;
      padding-left: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #aaaaaa;
    }
  }

  /** */
  .changeThemeBox {
    width: 200px;
    height: 35px;
    line-height: 35px;

    /* 主题选择按钮 */
    .changeThemeBtn {
      font-size: 20px;
      height: 20px;
      color: #cccccc;
      cursor: pointer;
      font-weight: bolder;
    }
  }
}
.inputContainer {
  text-align: center;
  height: 110px;
  p {
    font-size: 20px;
    line-height: 20px;
    margin-top: 10px;
  }
  input {
    width: 200px;
    height: 35px;
    border: 2px solid #aaaaaa;
  }
}

/** 搜索历史框 */
.historyBox {
  max-height: 750px;
  overflow: hidden;
  & > p {
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
  & > ul {
    list-style: none;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    & > li {
      height: 20px;
      max-width: 300px;
      line-height: 20px;
      font-size: 13px;
      padding-right: 5px;
      padding-left: 5px;
      border-radius: 10px;
      border: 1px solid #aaaaaa;
      box-sizing: border-box;
      margin: 0px {
        right: 10px;
        left: 10px;
        top: 5px;
        right: 5px;
      }
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      & > span:nth-of-type(1) {
        flex: 1;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 5px;
        cursor: pointer;
        &:hover {
          color: salmon;
        }
      }
      & > i:nth-of-type(1) {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        border-radius: 50%;
        color: #858585;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
  }
}

/** 主题选择框 */
.themeBox {
  width: 100%;
  & > span {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #aaa;
    box-sizing: border-box;
    margin: 20px;
    position: relative;
    cursor: pointer;
    & > i {
      position: absolute;
      bottom: 2px;
      right: 2px;
    }
  }
}
/* 被选择主题的选中状态展示 */
.show {
  display: block;
}
.noshow {
  display: none;
}
</style>

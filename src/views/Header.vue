<template>
  <div class="headerBox theme-red">
    <img
    class="logoImg"
    src="../../public/logo.jpg"
    alt="Logo"
    />

    <span class="weclome">Hello!</span>
    <div class="navToPage">
      <i class="iconfont">&#xe620;</i>
      <i class="iconfont">&#xe629;</i>
    </div>
    <div class="searchContainer">
      <div class="inputBox">
        <i class="iconfont">&#xe61e; </i>
        <input
          type="text"
          placeholder="搜索"
          @focus="inputFouces = true"
          @blur="inputFouces = false"
          v-model="keyWords"
        />
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
      >
      &#xe7c0;
      </i>
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
import { LOGIN } from "@/module/mutation-name.js"
export default {
  data () {
    return {
      // 搜索历史的显示
      inputFouces: false,
      // 搜索关键词
      keyWords: '',
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
      passwords: null
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
     *
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
      let regPhone = /[0-9]{11}/g
      if (regPhone.test(this.phoneNum)) {
        /**
         * 登录逻辑
         * 将用户的头像，用户名等信息储存在本地缓存中
         * 每次进如页面时判断cookie是否失效，如果失效了，删除本地缓存的用户信息
         */
        (async () => {
          _this.$message("正在登录...")
          const res = await HTTPS.login(_this.phoneNum, _this.passwords).then((res) => {
            // 登录成功
            if (res.data.code === 200) {
              _this.$message({
                message: "登录成功",
                type: "success",
                center: true
              })
              return res.data
            }else{
              _this.$message({
                message: `登录失败：${res.data.message}`,
                type: "warning",
                center: true
              })
            }
          },(err)=>{
            return err
          })

          // 如果有数据返回，则设置用户信息到缓存中
          if (res) {
            // 保存用户的头像链接
            localStorage.setItem('avatarUrl', res.profile.avatarUrl)
            // 保存用户的用户名
            localStorage.setItem('nickName', res.profile.nickname)
            // 保存用户Id
            localStorage.setItem('userId',res.profile.userId)
            // 保存cookie
            localStorage.setItem('cookie',res.cookie)
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
      let userInfo = {
        userName: localStorage.getItem('nickName'),
        userId: localStorage.getItem('userId'),
        avatarUrl: localStorage.getItem('avatarUrl')
      }
      this.$store.commit(`login/${LOGIN.SET_USER_INFO}`,userInfo) 
    },

    /**
     * 用户登录已失效，删除用户的信息
     */
    delLocationStoring () {
      localStorage.removeItem('nickName')
      localStorage.removeItem('avatarUrl')
      localStorage.removeItem('userId')
      localStorage.removeItem('cookie')
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

  /* 搜索盒子，包含搜索历史 */
  .searchContainer {
    width: 400px;
    height: 30px;
    margin-left: toRem(15px);

    /* 搜索框 */
    .inputBox {
      display: flex;
      width: 170px;
      height: 30px;
      border-radius: 15px;
      align-items: center;
      background-color: #ffffff;

      i {
        font-size: 16px;
      }
      input {
        width: 140px;
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

    i,
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

    /* 主题选择按钮 */
    .changeThemeBtn {
      font-size: 20px;
      height: 20px;
      color: #cccccc;
      cursor: pointer;
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
</style>

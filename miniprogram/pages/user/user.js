// miniprogram/pages/user/user.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: "../../images/tabbar/user_photo.png",
    nickName: "aa",
    isLogin: false,
    disabled: false

  },
  onLoad: function (options) {

  },
  // 当页面渲染完，登录过的用户自动登录
  onReady() {
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then(res => {
      // 查询
      db.collection('users').where({
        _openid: res.result.openid
      }).get().then(res => {
        if (res.data.length) {
          // 将res.data拷贝到app.userInfo
          app.userInfo = Object.assign(app.userInfo, res.data[0])
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
            isLogin: true,
          })
        }
        else {
          this.setData({
            disabled: false
          })
        }
      })
    })
  },
  bindGetUserInfo(ev) {
    let {
      userInfo
    } = ev.detail
    console.log(userInfo);
    if (!this.data.isLogin && userInfo) {
      db.collection('users').add({
        data: {
          userPhoto: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          // 签名
          signature: '',
          // 微信账号
          weixinNumber: '',
          // 点赞
          links: 0,
          // 创建时间
          time: new Date()
        }
      }).then(res => {
        // 将用户信息写入全局
        db.collection('users').doc(res._id).get().then(res => {
          // 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
          // 将res.data拷贝到app.userInfo
          app.userInfo = Object.assign(app.userInfo, res.data)
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
            isLogin: true
          })
        })
      })
    }
  }
})
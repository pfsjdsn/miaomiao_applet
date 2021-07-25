// miniprogram/pages/user/user.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户头像
    userPhoto: "../../images/tabbar/user_photo.png",
    // 用户昵称
    nickName: "aa",
    // 是否登录
    isLogin: false,
    // 登录按钮是否可用
    disabled: false,
    // 用户操作列表
    userList: [{
        url: '../editUserInfo/editUserInfo',
        text: '编辑个人信息',
        iconName: 'iconxiangyou'
      },
      {
        url: '../friendList/friendList',
        text: '查看好友列表',
        iconName: 'iconxiangyou'
      },
      {
        url: '../detail/detail',
        text: '个人主页',
        iconName: 'iconxiangyou',
      }
    ],
    // 自己当前的用户id
    id: ''

  },
  onLoad: function (options) {

  },
  // 当页面渲染完，登录过的用户自动登录
  onReady() {
    this.getLocation()
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
            id: app.userInfo._id
          })
          this.getMessage()
        } else {
          this.setData({
            disabled: false
          })
        }
      })
    })
  },
  onShow() {
    this.setData({
      userPhoto: app.userInfo.userPhoto,
      nickName: app.userInfo.nickName,
      id: app.userInfo._id
    })
  },
  bindGetUserInfo(ev) {
    let {
      userInfo
    } = ev.detail
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
          time: new Date(),
          // 是否位置共享
          isLocation: true,
          // 经度
          longitude: this.longitude,
          // 纬度
          latitude: this.latitude,
          // 构造一个地理位置 ”点“,用过获取附近的点
          location: db.Geo.Point(this.longitude, this.latitude),
          // 好友列表
          friendList: []
        }
      }).then(res => {
        // 将数据库中的用户信息写入全局
        db.collection('users').doc(res._id).get().then(res => {
          // 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象
          // 将res.data拷贝到app.userInfo
          app.userInfo = Object.assign(app.userInfo, res.data)
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            nickName: app.userInfo.nickName,
            isLogin: true,
            id: app.userInfo._id
          })
        })
      })
    }
  },
  // 监听消息的变化 
  getMessage() {
    db.collection('message').where({
      userId: app.userInfo._id
    }).watch({
      onChange: function (snapshot) {
        if (snapshot.docChanges.length) {
          let list = snapshot.docChanges[0].doc.list
          // 如果有未读消息
          if (list.length) {
            wx.showTabBarRedDot({
              index: 2,
            })
            app.userMessage = list
          }
          // 如果没有未读消息
          else {
            wx.hideTabBarRedDot({
              index: 2,
            })
            app.userMessage = list
          }
        } else {

        }
      },
      onError: function (err) {
        console.error('the watch closed because of error', err)
      }
    })
  },
  // 获取经纬度
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.latitude = res.latitude
        this.longitude = res.longitude

      }
    })
  }
})
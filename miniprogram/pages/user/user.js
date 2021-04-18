// miniprogram/pages/user/user.js

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: "../../images/tabbar/user_photo.png",
    nickName: "aa",
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindGetUserInfo (ev) {
    let {userInfo} = ev.detail
    console.log(userInfo);
    if (!this.data.isLogin &&  userInfo) {
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
        console.log(res)
      })
    }
  }
})
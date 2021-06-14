const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 消息列表
    userMessage: [],
    // 是否登录
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow () {
    if (app.userInfo._id) {
      this.setData({
        isLogin: true,
        userMessage: app.userMessage
      })
    }
    else {
      wx.showToast({
        title: '请先登录',
        duration: 2000,
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '../user/user',
            })
          }, 2000)
        }
      })
    }
  },
  onMyEvent: function(ev){
    console.log( ev.detail);
    this.setData({
      userMessage: []
    }, () => {
      this.setData({
        userMessage: ev.detail
      })
    })
  }
})
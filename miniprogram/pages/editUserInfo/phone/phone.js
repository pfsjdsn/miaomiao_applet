const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: ''
  },

  onReady () {    
    this.setData({
      phoneNumber: app.userInfo.weixinNumber
    })
  },
  handleText (ev) {
    let {value} = ev.detail
    this.setData({
      phoneNumber: value
    })
  },
  handleBtn () {
    this.updatePhoneNumber()
  },
  updatePhoneNumber () {
    wx.showLoading({
      title: '更新中',
    })
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        phoneNumber: this.data.phoneNumber
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '更新成功',
      })
      app.userInfo.weixinNumber = this.data.phoneNumber
    })
  }
})
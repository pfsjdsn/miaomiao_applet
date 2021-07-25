const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    signature: ''
  },


  onReady: function () {
    this.setData({
      signature: app.userInfo.signature
    })
  },
  handleText(ev) {
    let {
      value
    } = ev.detail
    this.setData({
      signature: value
    })
  },
  handleBtn() {
    this.updateSignature()
  },
  updateSignature() {
    wx.showLoading({
      title: '更新中',
    })
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        signature: this.data.signature
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '更新成功',
      })
      app.userInfo.signature = this.data.signature
    })
  }
})
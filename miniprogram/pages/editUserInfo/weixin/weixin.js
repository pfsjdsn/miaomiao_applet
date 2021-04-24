const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weixinNumber: ''
  },


  onReady: function () {    
    this.setData({
      weixinNumber: app.userInfo.weixinNumber
    })
  },
  handleText (ev) {
    console.log(ev);
    let {value} = ev.detail
    this.setData({
      weixinNumber: value
    })
  },
  handleBtn () {
    this.updateWeixinNumber()
  },
  updateWeixinNumber () {
    wx.showLoading({
      title: '更新中',
    })
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        weixinNumber: this.data.weixinNumber
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '更新成功',
      })
      app.userInfo.weixinNumber = this.data.weixinNumber
    })
  }

})
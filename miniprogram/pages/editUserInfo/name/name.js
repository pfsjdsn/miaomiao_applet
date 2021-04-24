const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: ''
  },

  onReady: function () {    
    this.setData({
      nickName: app.userInfo.nickName
    })
  },
  handleText (ev) {
    let {value} = ev.detail
    this.setData({
      nickName: value
    })
  },
  handleBtn () {
    this.updateNickName()
  },
  updateNickName () {
    wx.showLoading({
      title: '更新中',
    })
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        nickName: this.data.nickName
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '更新成功',
      })
      app.userInfo.nickName = this.data.nickName
    })
  },
  bindGetUserInfo (ev) {   
    let {userInfo} = ev.detail    
    if (userInfo) {
      this.setData({
        nickName: userInfo.nickName
      }, () => {
        this.updateNickName()
      })
    }
  }
  
})
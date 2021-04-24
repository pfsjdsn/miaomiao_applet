const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLocation: true
  },
  onReady: function () {
    this.setData({
      isLocation: app.userInfo.isLocation
    })
  },
  switchChange (ev) {
    let {value} = ev.detail
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        isLocation: value
      }
    }).then(res => {
      app.userInfo.isLocation = this.data.isLocation
    })
    
  } 
})
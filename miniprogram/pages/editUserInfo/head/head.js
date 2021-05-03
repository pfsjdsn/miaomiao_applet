// miniprogram/pages/editUserInfo/head/head.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 微信头像
    userPhoto: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      userPhoto: app.userInfo.userPhoto
    })
  },
  // 点击微信头像
  handleUploadImage () {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 压缩后， original 原图
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        this.setData({
          userPhoto: tempFilePaths
        })
      }
    })
  },
  // 使用自定义头像
  // 将本地资源上传至云存储空间，如果上传至同一路径则是覆盖写
  handleBtn () {
    wx.showToast({
      title: '上传中',
    })
    let cloudPath = "userPhoto/" + app.userInfo._openid + Date.now() + '.jpg'
    wx.cloud.uploadFile({
      cloudPath: cloudPath, // 云存储路径
      filePath: this.data.userPhoto, // 文件路径
    }).then((res) => {
      console.log(res);
      // 更新图片
      let fileID = res.fileID
      if (fileID) {
        // 更新图片到表里
        db.collection('users').doc(app.userInfo._id).update({
          data: {
            userPhoto: fileID
          }
        }).then((res) => {
          wx.hideLoading()
          wx.showToast({
            title: '上传并更新成功',
          })
          app.userInfo.userPhoto = fileID
        })
      }
      
    })
  },
  // 使用微信头像
  bindGetUserInfo (ev) {
    let {userInfo} = ev.detail    
    if (userInfo) {
      this.setData({
        userPhoto: userInfo.avatarUrl
      }, () => {
        wx.showToast({
          title: '上传中',
        })
        // 更新图片到表里
        db.collection('users').doc(app.userInfo._id).update({
          data: {
            userPhoto: userInfo.avatarUrl
          }
        }).then((res) => {
          wx.hideLoading()
          wx.showToast({
            title: '上传并更新成功',
          })
          app.userInfo.userPhoto = userInfo.avatarUrl
        })
      })
    }
  }

  
})
// pages/editUserInfo/editUserInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editList: [
      {
        url: '../editUserInfo/head/head',
        text: '修改头像',
        iconName: 'iconxiangyou'
      },
      {
        url: '../editUserInfo/name/name',
        text: '修改昵称',
        iconName: 'iconxiangyou'
      },
      {
        url: '../editUserInfo/signature/signature',
        text: '修改修改签名',
        iconName: 'iconxiangyou'
      },
      {
        url: '../editUserInfo/location/location',
        text: '共享位置',
        iconName: 'iconxiangyou'
      },
      {
        url: '../editUserInfo/phone/phone',
        text: '设置手机号',
        iconName: 'iconxiangyou',
        tips: '仅好友可见'
      },
      {
        url: '../editUserInfo/weixin/weixin',
        text: '设置微信号',
        iconName: 'iconxiangyou',
        tips: '仅好友可见'
      }
    ], 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
})
  const app = getApp()
  const db = wx.cloud.database()

  Page({

    /**
     * 页面的初始数据
     */
    data: {
      detail: {},
      // 是否为好友关系、
      isFriend: false,
      // 是否隐藏
      isHidden: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let {
        userId
      } = options
      // .doc 查找
      db.collection('users').doc(userId).get()
        .then((res) => {
          this.setData({
            detail: res.data
          })
          let friendList = res.data.friendList
          if (friendList.includes(app.userInfo._id)) {
            this.setData({
              isFriend: true,
            })
          } else {
            this.setData({
              isFriend: true
            }, () => {
              // 用户看到的是自己的页面
              if (userId === app.userInfo._id) {
                this.setData({
                  isFriend: false,
                  isHidden: true
                })
              }
            })
          }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    // 添加好友
    handleAddFriend() {
      if (app.userInfo._id) {
        db.collection('message').where({
          userId: this.data.detail._id
        }).get().then((res) => {
          if (res.data.length) { // 有则更新
            if (res.data[0].list.includes(app.userInfo._id)) {
              wx.showToast({
                title: '已申请过！',
              })
            } else {
              wx.cloud.callFunction({
                name: 'update',
                data: {
                  collection: 'message',
                  where: {
                    userId: this.data.detail._id
                  },
                  // '${app.userInfo._id}'  id在后台是字符串
                  data: `{list: _.unshift('${app.userInfo._id}')}`
                }
              }).then((res) => {
                wx.showToast({
                  title: '申请成功~',
                })
              })
            }
          }
          // 没有则添加
          else {
            db.collection('message').add({
              data: {
                userId: this.data.detail._id, // 自己的id
                list: [app.userInfo._id] // 别人的id
              }
            }).then((res) => {
              wx.showToast({
                title: '申请成功',
              })
            })
          }
        })

      } else {
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
    }
  })
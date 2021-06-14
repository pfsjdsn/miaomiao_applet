const app = getApp()
const db = wx.cloud.database()
const _ = db.command

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    messageId: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    userMessage: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 删除消息
    handleDelMessage() {
      wx.showModal({
        title: '提示信息',
        content: '删除消息',
        confirmText: '删除',
        success: (res) => {
          if (res.confirm) {
            this.removeMessage()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 添加好友
    handleAddFriend() {
      wx.showModal({
        title: '提示信息',
        content: '申请好友',
        confirmText: '同意',
        success: (res) => {
          if (res.confirm) {
            // 存在一个互相更新的状态
            // 更新自己的好友列表
            db.collection('users').doc(app.userInfo._id).update({
              data: {
                friendList: _.unshift(this.data.messageId)
              }
            }).then(res => {})
            // 更新别人的好友列表
            wx.cloud.callFunction({
              name: 'update',
              data: {
                collection: 'users',
                doc:this.data.messageId,
                data: `{ friendList: _.unshift('${app.userInfo._id}')}`
              }
            }).then(res => {})
            this.removeMessage()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 删除消息
    removeMessage () {
      db.collection('message').where({
        userId: app.userInfo._id
      }).get().then(res => {
        let list = res.data[0].list
        // 过滤所选id， 以达到删除的效果
        list = list.filter((val, i) => {
          return val !== this.data.messageId
        })
        wx.cloud.callFunction({
          name: 'update',
          data: {
            collection: 'message',
            where: {
              userId: app.userInfo._id
            },
            data: {
              list
            }
          }
        }).then(res => {
          this.triggerEvent('myevent', list)
        })
      })
    }
  },
  lifetimes: {
    attached: function () {
      db.collection('users').doc(this.data.messageId)
        // 过滤， 拿到自己想到的数据
        .field({
          userPhoto: true,
          nickName: true
        })
        .get().then(res => {
          this.setData({
            userMessage: res.data
          })

        })
    }
  },
})
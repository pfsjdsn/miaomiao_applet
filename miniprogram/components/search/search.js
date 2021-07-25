// components/search/search.js
const app = getApp()
const db = wx.cloud.database()

Component({
  /**
   * 组件的属性列表
   */

  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isFocus: false,
    historyList: [],
    searList: [],
    searchInput: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 聚焦事件
    handleFocus(val) {
      wx.getStorage({
        key: 'searchHistory',
        success: (res) => {
          this.setData({
            historyList: res.data
          })
        }
      })
      this.setData({
        isFocus: true
      })
    },
    // 取消事件
    handleCancel() {
      this.setData({
        searchInput: ''
      })
      this.setData({
        isFocus: false
      })
    },
    // 回车事件
    handleConfirm(ev) {
      let value = ev.detail.value
      let cloneHistoryList = [...this.data.historyList]
      cloneHistoryList.unshift(ev.detail.value)
      wx.setStorage({
        key: "searchHistory",
        data: [...new Set(cloneHistoryList)]
      })
      this.changeSearchList(value)
    },
    // 删除
    handleDelete() {
      wx.removeStorage({
        key: 'searchHistory',
        success: (res) => {
          this.setData({
            historyList: []
          })
        }
      })
    },
    // 搜索事件
    changeSearchList(value) {
      db.collection('users').where({
        nickName: db.RegExp({
          regexp: value,
          options: 'i', // 大小写不敏感(匹配大小写)
        })
      }).field({
        userPhoto: true,
        nickName: true
      }).get().then((res) => {
        this.setData({
          searList: res.data
        })
      })
    },
    // 点击历史记录再次搜索
    handleHistoryItemDel(ev) {
      let value = ev.target.dataset.text
      this.changeSearchList(value)
    }
  },

})
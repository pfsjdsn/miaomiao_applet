// components/search/search.js
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
    historyList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 聚焦事件
    handleFocus() {
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
        isFocus: false
      })
    },
    // 回车事件
    handleConfirm(ev) {
      let cloneHistoryList = [...this.data.historyList]
      cloneHistoryList.unshift(ev.detail.value)
      wx.setStorage({
        key: "searchHistory",
        data: [...new Set(cloneHistoryList)]
      })
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
    }
  }
})
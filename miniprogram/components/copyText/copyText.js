// components/copyText/copyText.js
Component({
  /**
   * 组件的属性列表
   */
    // apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面
  options: {
    styleIsolation:  'apply-shared'
  },
  properties: {
    copyText: String
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlCopyText () {
      wx.setClipboardData({
        // 需要拷贝的文字
        data: this.data.copyText, 
        success (res) {
          wx.showToast({
            title: '复制成功',
          })
        }
      })
    }
  }
})

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    imgList: [
      'https://th.bing.com/th/id/Rcb36aa58a643ec7d9c28f7dca5a5c0a2?rik=XeXmjs%2fKofzlHw&riu=http%3a%2f%2fwww.doudouxitong.com%2fuploads%2fallimg%2f151221%2f1-151221144034313.jpg&ehk=LylGTKkJtlY7QEM7bIQnjBUqVKgGNbbUpkXmwFhHxSs%3d&risl=&pid=ImgRaw',
      'https://th.bing.com/th/id/Rcb36aa58a643ec7d9c28f7dca5a5c0a2?rik=XeXmjs%2fKofzlHw&riu=http%3a%2f%2fwww.doudouxitong.com%2fuploads%2fallimg%2f151221%2f1-151221144034313.jpg&ehk=LylGTKkJtlY7QEM7bIQnjBUqVKgGNbbUpkXmwFhHxSs%3d&risl=&pid=ImgRaw'
    ],
    // tab列表
    listData: [],
    // 推荐/最新 切换
    current: 'links'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onReady() {
    this.getListData()
  },
  // 获取表里的数据
  getListData () {
    // field 方法 可过滤
    db.collection('users').field({
      userPhoto: true, 
      nickName: true, 
      links: true
    })
    //   按 links排序: 升序
    .orderBy(this.data.current, 'desc')
    .get().then((res) => {
      this.setData({
        listData:res.data
      })
    })
  },
  // 点赞
  handleLinks (ev) {
    console.log(ev);
    let {id} = ev.target.dataset
    wx.cloud.callFunction({
      name: 'update',
      data: {
        collection: 'users',
        doc: id,
        data: "{links:  _.inc(1)}"
      }
    }).then((res) => {
      console.log(res, 'res...');
      let {updated} =  res.result.stats
      console.log(updated);
      if (updated) {
        let cloneListData = [...this.data.listData]
        for(let i = 0; i < cloneListData.length; i++) {
          console.log(cloneListData[i]);
          if (cloneListData[i]._id === id) {
            cloneListData[i].links++
          }
        }
        this.setData({
          listData: cloneListData
        })        
      }
    })
  },
  // tab切换
  handleCurrent (ev) {
    let {current} = ev.target.dataset
    if (current === this.data.current) {
      return false
    }
    this.setData({
      current
    }, () => {
      this.getListData()
    })
  },
  // 进行详情页面
  handleDetail (ev) {
    let {id} = ev.target.dataset
    wx.navigateTo({
      url: '../detail/detail?userId=' + id,
    })
  }
})
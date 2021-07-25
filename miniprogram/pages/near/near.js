// miniprogram/pages/near/near.js

const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 经度
    longitude: "",
    // 纬度
    latitude: "",
    // 标记点
    markers: [],
    map: 1,
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
    // this.mapCtx = wx.createMapContext('myMap')
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getLocation()
  },
  // 获取经纬度
  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude,
          longitude
        })
        this.getNearUser()
      }
    })
  },
  // 获取附近的人位置
  getNearUser() {
    db.collection('users').where({
      location: _.geoNear({
        geometry: db.Geo.Point(this.data.longitude, this.data.latitude),
        // 最大距离与最小距离，单位为米
        minDistance: 0,
        maxDistance: 100000000
      }),
      // 当用户开启位置共享时，才可获取附近人的信息
      isLocation: true
    }).field({
      latitude: true,
      longitude: true,
      userPhoto: true
    }).get().then((res) => {
      let data = res.data
      let result = []
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].userPhoto.includes('cloud://')) {
            wx.cloud.getTempFileURL({
              fileList: [data[i].userPhoto],
              success: res => {
                result.push({
                  iconPath: data[i].userPhoto,
                  id: data[i]._id,
                  // id: 1,
                  latitude: data[i].latitude,
                  longitude: data[i].longitude,
                  width: 30,
                  height: 30
                })
                this.setData({
                  markers: result
                })
              },
            })
          } else {
            result.push({
              iconPath: data[i].userPhoto,
              // id: 1,
              id: data[i]._id,
              latitude: data[i].latitude,
              longitude: data[i].longitude,
              width: 30,
              height: 30
            })
          }
        }
        this.setData({
          markers: result
        })
      }
    })
  },
  // 点击标记点时触发
  markertap(ev) {
    wx.navigateTo({
      url: '/pages/detail/detail?userId=' + ev.target.dataset.myid,
    })
  }
})
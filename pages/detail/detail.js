//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    all: [],
    i:"0",
    timeout:false
  },
  //事件处理函数
  onLoad: function(option) {
    var that = this
    console.log(option)
    that.data.i = option.id
    wx.showLoading({
      title: '正在加载',
      mask: true,
      success: function(e) {
        wx.request({
          url: 'http://127.0.0.1:8000/movies/' + option.id,
          method: 'GET',
          success: function(res) {
            that.setData({
              timeout:false,
              all: res.data,
            })
            console.log(that.data.all)
            wx.hideLoading()
          },
          fail: function(res) {
            var that = this
            wx.hideLoading()
            that.setData({
              timeout:true
            })
            console.log(res)
          }
        })
      }
    })
  },
  showImgCover: function(e) {
    console.log(e)
    var src = e.target.dataset.src
    var imgList = [src]
    wx.previewImage({
      current: src,
      urls: imgList
    })
  },
  showImgActors: function(e) {
    console.log(e)
    var that = this
    var src = e.target.dataset.src
    var imgList = []
    for (var i = 0; i < that.data.all.actors.length; i++) {
      imgList[i] = that.data.all.actors[i].imgurl
    }
    wx.previewImage({
      current: src,
      urls: imgList
    })
  },
  showImgStills: function(e) {
    console.log(e)
    var that = this
    var src = e.target.dataset.src
    var imgList = []
    for (var i = 0; i < that.data.all.stills.length; i++) {
      imgList[i] = that.data.all.stills[i].imgurl
    }
    wx.previewImage({
      current: src,
      urls: imgList
    })
  },
  onPullDownRefresh : function(){
    wx.showNavigationBarLoading()
    var that = this
    wx.showLoading({
      title: '正在加载',
      mask: true,
      success: function (e) {
        wx.request({
          url: 'http://167.99.174.196:8001/movies/' + that.data.i,
          method: 'GET',
          success: function (res) {
            that.setData({
              all: res.data,
            })
            console.log(that.data.all)
            wx.hideLoading()
            wx.hideNavigationBarLoading()
            wx.stopPullDownRefresh()
          },
          fail: function (res) {
            wx.hideLoading()
            console.log(res)
          }
        })
      }
    })
  }
})
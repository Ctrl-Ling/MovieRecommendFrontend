// pages/shouye/shouye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    error: '',
    text1: 'black',
    text2: "black"
  },
  compareLTH: function(prop) {
    return function(obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    }
  },
  compareHTL: function(prop) {
    return function(obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (val1 < val2) {
        return 1;
      } else if (val1 > val2) {
        return -1;
      } else {
        return 0;
      }
    }
  },
  LowToHight: function() {
    this.data.movies.sort(this.compareLTH("grade"))
    this.setData({
      movies: this.data.movies,
      text1: "red",
      text2: "black"
    })
  },
  HightToLow: function() {
    this.data.movies.sort(this.compareHTL("grade"))
    this.setData({
      movies: this.data.movies,
      text1: "black",
      text2: "red"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    wx.showLoading({
      title: '正在加载',
      mask: true,
      success: function(e) {
        wx.request({
          url: 'http://127.0.0.1:8000/movies/',
          data: '',
          header: {
            'content-type': 'application/json'
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            self.setData({
              movies: res.data
            })
            wx.hideLoading()
          },
          fail: function(res) {
            wx.hideLoading()
            self.setData({
              error: "垃圾后台崩了"
            })

          },
          complete: function(res) {},
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var self = this
    wx.showLoading({
      title: '正在加载',
      mask: true,
      success: function(e) {
        wx.request({
          url: 'http://127.0.0.1:8000/movies/',
          data: '',
          header: {
            'content-type': 'application/json'
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            self.setData({
              movies: res.data
            })
            wx.hideLoading()
          },
          fail: function(res) {
            wx.hideLoading()
            self.setData({
              error: "垃圾后台崩了"
            })

          },
          complete: function(res) {},
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
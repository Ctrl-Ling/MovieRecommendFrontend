// pages/type/type.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
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
          url: 'http://167.99.174.196:8001/movies/?type=' + options.typename,
          data: '',
          header: {
            'content-type': 'application/json'
          },
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: function(res) {
            console.log(options)
            self.setData({
              movies: res.data
            })
            console.log(res.data)
            console.log(self.data.movies[0])
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
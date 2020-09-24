// pages/rank/rank.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    books111:[],
    options:{}
  },
  //月榜
  monthRank() {
    api.rankInfo(this.data.options.monthRank).then(res => {
      this.setData({
        books111:res.ranking.books,
        active:1,
      })
      console.log(this.data.books111, "排行详情数据");
      // console.log(res, "排行详情数据");
    }).catch(err => {
      this.setData({
        active:1,
      })
      console.log(err);
    });
  },
  //周榜
  totalRank() {
    api.rankInfo(this.data.options.id).then(res => {
      this.setData({
        books111:res.ranking.books,
        active:0,
      })
      console.log(this.data.books111, "排行详情数据");
      // console.log(res, "排行详情数据");
    }).catch(err => {
      console.log(err);
    });
  },
  //总榜
  allrank() {
    api.rankInfo(this.data.options.totalRank).then(res => {
      this.setData({
        books111:res.ranking.books,
        active:2,
      })
      console.log(this.data.books111, "排行详情数据");
      // console.log(res, "排行详情数据");
    }).catch(err => {
      this.setData({
        active:2,
      })
      console.log(err);
    });
  },
  //跳转详情
  gotodetail(e) {
    console.log(e, "item参数")
    // console.log(e.currentTarget.dataset.id, "书籍id")
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, "排行数据")
    wx.setNavigationBarTitle({
      title: options.title //页面标题为路由参数
    })
    api.rankInfo(options.id).then(res => {
      this.setData({
        books111:res.ranking.books,
        active:0,
        options:options
      })
      console.log(this.data.books111, "排行详情数据");
      console.log(res, "排行详情数据");
    }).catch(err => {
      console.log(err);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      })
    }, 2000);
    wx.showLoading({
      title: '加载中...',
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 2000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
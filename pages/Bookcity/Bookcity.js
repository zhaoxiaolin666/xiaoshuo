// pages/Bookcity/Bookcity.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    male: [],
    female: [],
    press: [],
    rankmale: [],
    rankfemale: [],
  },
  clickclass() {
    this.setData({
      active: 0
    })

  },
  clickrank() {
    this.setData({
      active: 1
    })
  },
  //分类
  getclassData() {
    api.getCats().then(res => {
      this.setData({
        male: res.male,
        female: res.female,
        press: res.press
      })
      console.log(res, "大分类");
    }).catch(err => {
      console.log(err);
    });
  },
  
  //排行
  rankData() {
    api.rankCategory().then(res => {
      //男生
      this.data.rankmale = res.female
      this.data.rankmale = this.data.rankmale.filter(item => {
        return item.collapse === false
      })
      this.setData({
        rankmale: this.data.rankmale
      })
      //女生
      this.data.rankfemale = res.male
      this.data.rankfemale = this.data.rankfemale.filter(item => {
        return item.collapse === false
      })
      this.setData({
        rankfemale: this.data.rankfemale
      })
      //  console.log(this.data.rankmale,'男生排行')
      //  console.log(this.data.rankfemale,'女生排行')
      // console.log(res,"排行");
    }).catch(err => {
      console.log(err);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getclassData(),
      this.rankData()
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
        icon:'success'
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
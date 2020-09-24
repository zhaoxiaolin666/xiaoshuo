// pages/catalog/catalog.js
import api from "../../http/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    options: {},
    id111: '',
    allchapters:[]
  },
  //选章节到详情页
  choice(e) {
    console.log(e.currentTarget.dataset.num,"章节下标")
    let a =e.currentTarget.dataset.num
    console.log(this.data.options,"kjlkzjlkv")
    wx.redirectTo({
      url: `/pages/read/read?id=${this.data.options.id}&name=${this.data.options.name}&num=${a}`,
    })
  },
  //书源
  bookSources() {
    api.bookSources(this.data.options.id).then(res => {
      console.log(res, "书源")
      this.setData({
        id111: res[0]._id
      })
      this.bookChapters()
    }).catch(err => {
      console.log(err)
    })
  },
  //章节
  bookChapters() {
    api.bookChapters(this.data.id111).then(res => {
      console.log(res, "章节")
      console.log(res.chapters, "书籍章节")
      let chapters = []
      chapters = res.chapters
      let all = []
      chapters.map(item => {
        all.push(item.title)
      })
      this.setData({
        allchapters: all
      })
      console.log(this.data.allchapters, "章节目录内容")
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })
    wx.setNavigationBarTitle({
      title: options.name //页面标题为路由参数
    })
    console.log(options, "总章节目录")
    this.bookSources()
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
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: [], //本地书籍id
    books: [],
    flag: false
  },
  //编辑
  edit() {
    this.setData({
      flag: true
    })
  },
  //还原
  back() {
    this.setData({
      flag: false
    })
  },
  //取消书架
  del(e) {
    console.log(e.currentTarget.dataset.id, "id")
    let a = []
    a = wx.getStorageSync('id')
    //去掉相同id
    a = a.filter((item) => {
      return item !== e.currentTarget.dataset.id
    })
    wx.setStorageSync('id', a)
    //刷新
    this.setData({
      books: []
    })
    this.data.id = wx.getStorageSync('id') //取出本地id
    console.log(this.data.id)
    this.data.id.map((item) => {
      api.bookInfo(item).then(res => {
        this.data.books.unshift(res)
        this.setData({
          books: this.data.books
        })
        console.log(this.data.books, "书架书籍详情")
        console.log(res, "单个书籍详情")
      }).catch(err => {
        console.log(err)
      })
    })
  },
  //跳转详情页
  gotodetail(e) {
    // console.log(e,"item参数")
    // console.log(e.currentTarget.dataset.id, "书籍id")
    if (this.data.flag === false) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
      })
    }
  },
  //帮助
  gotohelp() {
    wx.navigateTo({
      url: '/pages/help/help'
    })
  },
  //刷新
  news() {
    this.setData({
      books: []
    })
    this.data.id = wx.getStorageSync('id') //取出本地id
    console.log(this.data.id)
    this.data.id.map((item) => {
      api.bookInfo(item).then(res => {
        this.data.books.unshift(res)
        this.setData({
          books: this.data.books
        })
        console.log(this.data.books, "书架书籍详情")
        console.log(res, "单个书籍详情")
      }).catch(err => {
        console.log(err)
      })
    })
  },
  // //书籍数据
  // bookInfoData() {
  //   this.data.id = wx.getStorageSync('id') //取出本地id
  //   console.log(this.data.id)
  //   this.data.id.map((item) => {
  //     api.bookInfo(item).then(res => {
  //       this.data.books.unshift(res)
  //       this.setData({
  //         books: this.data.books
  //       })
  //       console.log(this.data.books, "书架书籍详情")
  //       console.log(res, "单个书籍详情")
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.bookInfoData()
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
    //刷新
    this.setData({
      books: []
    })
    this.data.id = wx.getStorageSync('id') //取出本地id
    console.log(this.data.id)
    this.data.id.map((item) => {
      api.bookInfo(item).then(res => {
        this.data.books.unshift(res)
        this.setData({
          books: this.data.books
        })
        console.log(this.data.books, "书架书籍详情")
        console.log(res, "单个书籍详情")
      }).catch(err => {
        console.log(err)
      })
    })
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
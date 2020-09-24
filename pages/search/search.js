// pages/search/search.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newHotWords: [],
    colorArr: '',
    // 存储随机颜色
    randomColorArr: [],
    books: [],
    flag: false,
    history: [],
    history111: []
  },
  //搜索历史
  tabhistory(e) {
    console.log(e.currentTarget.dataset.id, "搜索历史内容")
    api.bookSearch(e.currentTarget.dataset.id).then(res => {
      this.setData({
        books: res.books
      })
      if (res.books.length > 0) {
        this.setData({
          flag: true,
        })
      } else {
        this.setData({
          flag: false,
        })
      }
      console.log(res.books, "书籍搜索")
    }).catch(err => {
      console.log(err)
    })
  },
  //跳转详情页
  gotodetail(e) {
    // console.log(e,"item参数")
    // console.log(e.currentTarget.dataset.id.book, "书籍id")
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id.book}`,
    })
  },
  gotodetail111(e) {
    // console.log(e,"item参数")
    // console.log(e.currentTarget.dataset.id, "书籍id")
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //删除搜索历史
  delhistory() {
    wx.clearStorageSync()
    this.setData({
      history111: []
    })
  },
  //书籍搜索
  Search(e) {
    // console.log(e,'input输入事件')
    if (e.detail.value === '') {
      this.setData({
        flag: false
      })
    }
  },
  onSearch(e) {
    console.log(e.detail.value, "搜索关键词")
    this.data.history.push(e.detail.value)
    this.data.history = this.data.history.filter((item, index, self) => {
      return self.indexOf(item) === index&&item!=="";
    });
    wx.setStorageSync('Search-history', this.data.history)
    this.data.history111 = wx.getStorageSync('Search-history')
    api.bookSearch(e.detail.value).then(res => {
      this.setData({
        books: res.books
      })
      if (res.books.length > 0) {
        this.setData({
          flag: true,
          history111: this.data.history111
        })
      } else {
        this.setData({
          flag: false,
          history111: this.data.history111
        })
      }
      this.data.history111 = wx.getStorageSync('Search-history')
      console.log(res.books, "书籍搜索")
    }).catch(err => {
      console.log(err)
    })
  },
  clicktab() {
    //搜索热词
    api.hotWord().then(res => {
      this.setData({
        randomColorArr: [],
        newHotWords: res.newHotWords
      })
      for (let i = 0; i < res.newHotWords.length; i++) {
        let num1 = parseInt(Math.random() * 250)
        let num2 = parseInt(Math.random() * 250)
        let num3 = parseInt(Math.random() * 250)
        this.data.colorArr = `rgb(${num1},${num2},${num3},0.9)`
        this.data.randomColorArr.unshift(this.data.colorArr)
        this.setData({
          randomColorArr: this.data.randomColorArr,
        })
      }
      // console.log(res, "搜索热词");
      // console.log(this.data.newHotWords, "搜索热词");
    }).catch(err => {
      console.log(err);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (wx.getStorageSync('Search-history')) {
      that.data.history111 = wx.getStorageSync('Search-history')
      that.setData({
        history111: that.data.history111
      })
    }
    //搜索热词
    api.hotWord().then(res => {
      that.setData({
        newHotWords: res.newHotWords
      })
      for (let i = 0; i < res.newHotWords.length; i++) {
        let num1 = parseInt(Math.random() * 250)
        let num2 = parseInt(Math.random() * 250)
        let num3 = parseInt(Math.random() * 250)
        that.data.colorArr = `rgb(${num1},${num2},${num3})`
        that.data.randomColorArr.push(that.data.colorArr)
        that.setData({
          randomColorArr: that.data.randomColorArr,
        })
      }
      // console.log(res, "搜索热词");
      // console.log(that.data.newHotWords, "搜索热词");
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
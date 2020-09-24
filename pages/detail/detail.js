// pages/detail/detail.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    score: 0,
    star: 0,
    active: 0,
    books: [],
    showbooks: [],
    reviews: [],
    options: {},
    title: '',
    flag:false,
    allchapters:[],
  },
  //总章节 目录
  catalog(){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.options.id}&name=${this.data.title}`,
    })
  },
  //详情
  clickclass() {
    this.setData({
      active: 0
    })
  },
  //评价
  clickrank() {
    this.setData({
      active: 1
    })
  },
  //开始阅读
  readnow() {
    wx.navigateTo({
      url: `/pages/read/read?id=${this.data.options.id}&name=${this.data.title}`,
    })
  },
  //加入书架
  addbook() {
    this.setData({
      flag:true
    })
    if (wx.getStorageSync('id')) {
      let a = []
      a = wx.getStorageSync('id')
      a.unshift(this.data.options.id)
      //id去重
      a = a.filter((item, index, arr) => {
        return arr.indexOf(item) === index
      })
      wx.setStorageSync('id', a)
    } else {
      let a = []
      a.unshift(this.data.options.id)
      wx.setStorageSync('id', a)
    }
  },
   //取消加入书架
   notbook(){
    this.setData({
      flag:false
    })
      let a = []
      a = wx.getStorageSync('id')
      a.unshift(this.data.options.id)
      //去掉相同id
      a = a.filter((item) => {
        return item!==this.data.options.id
      })
      wx.setStorageSync('id', a)
   },
  //切换相关书籍
  clicktab() {
    //0-19随机数
    // let lang = this.data.books.length
    // for (;;) {
    //   let a = Math.ceil(Math.random() * (lang - 1 - 0) + 0)
    //   let b = Math.ceil(Math.random() * (lang - 1 - 0) + 0)
    //   let c = Math.ceil(Math.random() * (lang - 1 - 0) + 0)
    //   if (a !== b && b !== c & c !== a) {
    //     this.data.showbooks = [],
    //     this.data.showbooks.push(this.data.books[a])
    //     this.data.showbooks.push(this.data.books[b])
    //     this.data.showbooks.push(this.data.books[c])
    //     this.setData({
    //       showbooks: this.data.showbooks
    //     })
    //     console.log(this.data.showbooks)
    //     break;
    //   }
    // }
    //0-17随机数
    let lang = this.data.books.length
    let num = Math.ceil(Math.random() * (lang - 3 - 0) + 0)
    this.data.showbooks = [],
      this.data.showbooks.push(this.data.books[num])
    this.data.showbooks.push(this.data.books[num + 1])
    this.data.showbooks.push(this.data.books[num + 2])
    this.setData({
      showbooks: this.data.showbooks
    })
  },
  // 预览图片
 previewImage(e) {
   let current = e.target.dataset.src  //获取当前点击的 图片 url
  //  console.log(current)
  //  let a=[]
  //  a.push(`https://statics.zhuishushenqi.com${current}`)
   wx.previewImage({
     current,//当前显示图片链接
     urls:[`https://statics.zhuishushenqi.com${current}`]//预览图片链接
   })
 },
  //跳转详情页
  gotodetail(e) {
    // console.log(e,"item参数")
    // console.log(e.currentTarget.dataset.id, "书籍id")
      wx.redirectTo({
        url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     console.log(options, "书籍id对象")
     this.setData({
      options:options
     })
    api.bookInfo(options.id).then(res => {
        this.data.star = res.rating.score / 2
        this.data.score = parseInt(res.rating.score / 2)
        // console.log(this.data.score)
        // console.log(this.data.star)
        this.setData({
          options: options,
          detail: res,
          score: this.data.score,
          star: this.data.star,
          title: res.title
        })
        wx.setNavigationBarTitle({
          title: res.title //页面标题为路由参数
        })
        console.log(res, "书籍详情")
      }).catch(err => {
        console.log(err)
      }),
      //相关书籍
      api.relatedRecommendedBooks(options.id).then(res => {
        this.data.showbooks = res.books.slice(0, 3)
        console.log(this.data.showbooks)
        this.setData({
          books: res.books,
          showbooks: this.data.showbooks
        })
        console.log(res, "书籍相关推荐")
      }).catch(err => {
        console.log(err)
      })
    // 短评
    api.shortReviews(options.id).then(res => {
      this.setData({
        reviews: res.reviews
      })
      console.log(res, "短评")
    }).catch(err => {
      console.log(err)
    })
    //判断是否加入书架
    let a = []
    a = wx.getStorageSync('id')
    this.data.flag=a.some(item=>{
      return item===this.data.options.id
    })
    this.setData({
      flag:this.data.flag
    })
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
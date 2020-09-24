// pages/read/read.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    link: '',
    chapter: {},
    cpContent: '',
    options: {},
    options111: {},
    id111: '',
    chapters: [],
    show: false,
    title: '',
    defaultlink: 0,
    flag:false,
  },
  //目录 
  catalog() {
    wx.redirectTo({
      url: `/pages/catalog/catalog?id=${this.data.options111.id}&name=${this.data.options111.name}`,
    })
  },
  //显示隐藏
  look() {
    if (this.data.show) {
      this.setData({
        show: false
      })
    } else {
      this.setData({
        show: true
      })
    }
  },
  //书源
  bookSources() {
    console.log(this.data.defaultlink, "下标")
    api.bookSources(this.data.options.id).then(res => {
      console.log(res, "书源")
      this.setData({
        id111: res[0]._id
      })
      console.log(this.data.id111, "下标id")
      this.bookChapters()
    }).catch(err => {
      console.log(err)
    })
  },
  //章节
  bookChapters() {
    console.log(this.data.options.num, "num下标")
    if (this.data.options.num >= 0) {
      if(this.data.flag){
        console.log(this.data.options.num,4444444444444444)
        let aaa=Number(this.data.options.num)+1
        this.setData({
          defaultlink:aaa
        })
        console.log(this.data.defaultlink,'456789123')
        api.bookChapters(this.data.id111).then(res => {
          console.log(res.chapters, "章节777")
          this.setData({
            link: res.chapters[this.data.defaultlink].link
          })
          this.bookChaptersBookId()
        }).catch(err => {
          console.log(err)
        })
      }else{
        this.data.defaultlink = this.data.options.num
        api.bookChapters(this.data.id111).then(res => {
          console.log(res.chapters, "章节999")
          console.log(res.chapters[0].link, "link值")
          this.setData({
            link: res.chapters[this.data.defaultlink].link,
            options:this.data.options
          })
          this.bookChaptersBookId()
        }).catch(err => {
          console.log(err)
        })
      }
    } else {
      if(this.data.flag){
        console.log(111111111111111)
        let aaa=this.data.defaultlink+1
        this.setData({
          defaultlink:aaa
        })
        console.log(this.data.defaultlink,"33333333333333333333333")
        api.bookChapters(this.data.id111).then(res => {
        console.log(res.chapters, "章节888")
        this.setData({
          link: res.chapters[this.data.defaultlink].link
        })
        this.bookChaptersBookId()
      }).catch(err => {
        console.log(err)
      })
      }else{
        console.log(22222222222222222)
        api.bookChapters(this.data.id111).then(res => {
          console.log(res.chapters, "章节888")
          this.setData({
            link: res.chapters[0].link
          })
          this.bookChaptersBookId()
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  //link请求
  bookChaptersBookId() {
    //内容请求
    this.setData({
      chapter: []
    })
    api.chapterContent(this.data.link).then(res => {
      console.log(res.chapter, "章节内容78945613")
      this.data.chapter = res.chapter
      this.data.cpContent = this.data.chapter.cpContent.split('\n');
      console.log(this.data.cpContent)
      this.setData({
        chapter: res.chapter,
        title: res.chapter.title,
        cpContent: this.data.cpContent
      })
      console.log(res, "章节内容")
    }).catch(err => {
      console.log(err)
    })
  },
  //减字体大小
  reduce(){

  },
  //加字体大小
  add(){

  },
  //改变背景颜色
  background(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options,
      options111: options,
    })
    console.log(options, "456131321111111111111111111")
    wx.setNavigationBarTitle({
      title: options.name //页面标题为路由参数
    })
    //书源
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
    //上拉加载
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      flag:true
    })
     //书源
     this.bookSources()
    setTimeout(() => {
      wx.hideLoading()
      this.setData({
        flag:false
      })
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 10
      })
    }, 1000);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
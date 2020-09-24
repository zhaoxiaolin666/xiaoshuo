  // pages/minor/minor.js
  import api from '../../http/api'
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      minor: {}, //小类
      keys: [], //大类键
      values: [], //大类键值
      indexs: -1, //大类下标
      minor111: {}, //小类
      minor222: [], //小类
      start: 0, //初始加载数
      booksnins: [], //分类数据初始数据
      a: 0, //类型初始下标
      b: -1, //小类初始数据
      options: {}, //分类传输的数据（大类，男女出版）
      typeids: '',
      limit:20,//20条
      //类型
      typeList: [{
          id: 'hot',
          name: '热门'
        },
        {
          id: 'new',
          name: '新书'
        },
        {
          id: 'reputation',
          name: '好评'
        },
        {
          id: 'over',
          name: '完结'
        },
        {
          id: 'monthly',
          name: 'VIP'
        }
      ],
    },
    //分类数据
    getCatsBooksData() {
      //分类数据
      let gender = this.data.options.gender
      let id = this.data.typeList[this.data.a].id
      let major = this.data.options.major
      let minor = this.data.minor222[this.data.b]
      if (this.data.b === -1) {
        minor = []
      }
      let start = this.data.start
      let limit=this.data.limit
      api.getCatsBooks(gender, id, major, minor, start,limit).then(res => {
        this.data.booksnins = res.books
        this.data.booksnins.map(item => {
          item.tags = item.tags.slice(0, 3)
        })
        this.setData({
          booksnins: this.data.booksnins,
        })
        console.log(this.data.booksnins, "分类书籍")
        // console.log(res, "分类书籍")
      }).catch(err => {
        console.log(err)
      })
    },
    //跳转详情
    gotodetail(e) {
      console.log(e, "item参数")
      // console.log(e.currentTarget.dataset.id, "书籍id")
      wx.navigateTo({
        url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
      })
    },
    //类型下标
    typeid(e) {
      // console.log(e, "索引")
      this.setData({
        a: e.currentTarget.dataset.index,
      })
      console.log(this.data.spubscrit, "下标")
      this.getCatsBooksData()
    },
    //全部
    all() {
      this.setData({
        b: -1
      })
      this.getCatsBooksData()
    },
    //小类下标
    minorid(e) {
      console.log(e.currentTarget.dataset.index, "小类下标")
      this.setData({
        b: e.currentTarget.dataset.index
      })
      this.getCatsBooksData()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.showLoading({
        title: '加载中...',
      })
      setTimeout(() => {
        wx.hideLoading()
      }, 1000);
      this.setData({
        options: options
      })
      wx.setNavigationBarTitle({
        title: options.major //页面标题为路由参数
      })
      console.log(options, "分类传参")
      //小分类
      api.getMinor().then(res => {
        this.setData({
          minor: res,
        })
        // console.log(res, "小分类")
        // console.log(Object.keys(this.data.minor), "键")
        this.data.keys = Object.keys(this.data.minor)
        this.data.keys.map((item, index) => {
          if (item === options.gender) {
            this.data.indexs = index
          }
        })
        // console.log(this.data.indexs)
        this.data.values = Object.values(this.data.minor)
        // console.log(Object.values(this.data.minor), "键值")
        let sex = this.data.values[this.data.indexs]
        sex.map(item => {
          if (options.major === item.major) {
            this.data.minor111 = item
          }
        })
        // console.log(this.data.minor111, "大小类")
        this.setData({
          minor222: this.data.minor111.mins
        })
        // console.log(this.data.minor222,"小类")
      }).catch(err => {
        console.log(err)
      })
      this.getCatsBooksData()
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
      //上拉加载
      wx.showLoading({
        title: '加载中...',
      })
       //分类数据
       let gender = this.data.options.gender
       let id = this.data.typeList[this.data.a].id
       let major = this.data.options.major
       let minor = this.data.minor222[this.data.b]
       if (this.data.b === -1) {
         minor = []
       }
       let start = this.data.start+this.data.limit
       let limit=this.data.limit+this.data.limit
       this.setData({
         limit:limit,
         start:start
       })
       api.getCatsBooks(gender, id, major, minor, start,limit).then(res => {
         let booksnins111=[]
         booksnins111 = res.books
         booksnins111.map(item => {
           item.tags = item.tags.slice(0, 3)
         })
         this.setData({
           booksnins: this.data.booksnins.concat(booksnins111),
         })
         console.log(this.data.booksnins, "分类书籍")
         // console.log(res, "分类书籍")
       }).catch(err => {
         console.log(err)
       })
      setTimeout(() => {
        wx.hideLoading()
      }, 2000);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  })
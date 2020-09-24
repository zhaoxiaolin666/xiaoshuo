const {
  default: api
} = require("../../http/api")

// components/classification/classification.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    male: {
      type: Array
    },
    title: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabgetMinor(e) {
      console.log(this.data.title) 
        console.log(e, 123)
      // console.log(e.currentTarget.dataset.major.name,999)
      wx.navigateTo({
        url: `/pages/minor/minor?gender=${this.data.title}&major=${e.currentTarget.dataset.major.name}`,
      })
    }
  }
})
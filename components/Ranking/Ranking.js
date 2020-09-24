// components/Ranking/Ranking.js
import api from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rankmale: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  //排行详情

  /**
   * 组件的方法列表
   */
  methods: {
    clickrankInfo: (e) => {
      console.log(e.currentTarget.dataset.id, "排名书籍id")
      let id = e.currentTarget.dataset.id
      api.rankInfo(id).then(res => {
        let a = res.ranking.monthRank
        let b = res.ranking.totalRank
        let c = res.ranking._id
        let d = res.ranking.title
        wx.navigateTo({
          url: `/pages/rank/rank?monthRank=${a}&totalRank=${b}&id=${c}&title=${d}`,
        })
        console.log(res, "排行详情");
      }).catch(err => {
        console.log(err);
      });
    },
  }
})
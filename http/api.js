const fly = require('./index')

export default {
  getCats() {
    //书城大分类
    return fly.get('/cats/lv2/statistics')
  },
  rankCategory() {
    //书城排行
    return fly.get('/ranking/gender')
  },
  rankInfo(rank_id) {
    //书城排行详情
    return fly.get(`/ranking/${rank_id}`)
  },
  hotWord() {
    //热搜
    return fly.get('/book/hot-word')
  },
  bookSearch(content) {
    //搜索书籍
    return fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`)
  },
  bookInfo(book_id) {
    //书籍详情
    return fly.get(`/book/${book_id}`)
  },
  relatedRecommendedBooks(book_id) {
    //书籍相关推荐
    return fly.get(`/book/${book_id}/recommend`)
  },
  shortReviews(book_id) {
    //短评
    return fly.get(`/post/review/by-book?book=${book_id}`)
  },
  getMinor() {
    //小分类
    return fly.get('/cats/lv2')
  },
  getCatsBooks(gender, type, major, minor, start,limit) {
    //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
    if (minor) {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`)
    } else {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=${limit}`)
    }
  },
  bookSources(book_id) { // @param book_id 书籍id
    // 书源  注意：第一个优质书源为收费源
    return fly.get(`/atoc?view=summary&book=${book_id}`)
  },
  bookChapters(id) { // @param id 书源id
    // 书籍章节 根据书源id
    return fly.get(`/atoc/${id}?view=chapters`)
  },
  bookChaptersBookId(book_id) {
    // 书籍章节 根据书id
    return fly.get(`/mix-atoc/${book_id}?view=chapters`)
  },
  chapterContent(link) { // @param link 章节link
    // 章节内容
    return fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
  },

}
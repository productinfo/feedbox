var ArticleService = require('../services/ArticleService')
var User = require('../models/User')
var axios = require('axios')

module.exports = {
  // Get All articles by subscriptions
  index: async (req, res) => {
    const user = await User.where('id', req.user.sub).fetch({ withRelated: ['feeds'] })
    const feeds = user.related('feeds').toArray().map((feed) => {
      return feed.id
    })
    const page = req.query.page
    const articles = await ArticleService.getAllArticles(feeds, page)
    return res.status(200).json(articles)
  },
  // Fetch single article
  fetchArticle: async (req, res) => {
    const article = await ArticleService.getArticle(req.params.uuid)
    return res.status(200).json(article)
  },
  // Parse article
  parseArticle: async (req, res) => {
    const apiUri = 'https://mercury.postlight.com/parser'
    const url = req.query.url
    const article = await axios.get(`${apiUri}?url=${url}`, {
      headers: {
        'x-api-key': process.env.MERCURY_PARSER_TOKEN
      }
    })
    return res.status(200).json(article.data)
  }
}

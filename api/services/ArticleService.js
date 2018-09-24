var Article = require('../models/Entry')

/**
 * Get all articles by subscriptions
 *
 * @param {array} feeds
 */
exports.getAllArticles = async (feeds, pageNo) => {
  const articles = await Article.forge().where('feed_id', 'in', feeds).orderBy('published_date', 'DESC').fetchPage({
    pageSize: 10,
    page: pageNo,
    withRelated: ['feed']
  })
  return articles
}

/**
 * Fetch single article
 *
 * @param {string} uuid 
 */
exports.getArticle = async (uuid) => {
  const article = await Article.where('uuid', uuid).fetch()
  return article
}

/**
 * Store articles to database
 *
 * @param {object} siteInfo
 * @param {object} article
 * @param {integer} feedId
 */
exports.storeArticle = (siteInfo, article, feedId) => {
  const newArticle = new Article({
    title: article.title,
    author: article.author,
    article_url: article.link,
    site_url: siteInfo.url,
    favicon: siteInfo.favicon,
    published_date: article.pubDate,
    feed_id: feedId
  })
  const articleData = newArticle.save()
  return articleData
}

var Article = require('../models/Entry')

// Store Feed and attach it to User
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

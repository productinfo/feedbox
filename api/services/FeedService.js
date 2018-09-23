var Feed = require('../models/Feed')

/**
 * Check if feed exists
 * @param {string} feedUrl
 */
exports.feedExists = async (feedUrl) => {
  const feedExists = await Feed.where('feed_url', feedUrl).fetch({ withRelated: ['users', 'entries'] })
  return feedExists
}

/**
 * Store feed to database
 * @param {object} siteInfo
 * @param {object} feedItem
 * @param {User} user
 */
exports.storeFeed = async (siteInfo, feedItem, user) => {
  const newFeed = new Feed({
    title: feedItem.meta.title,
    feed_url: feedItem.meta.xmlurl,
    site_url: siteInfo.url,
    favicon: siteInfo.favicon
  })
  const feed = await newFeed.save()
  feed.users().attach(user)
  return feed
}

/**
 * Unsubscribe feed
 * @param {integer} feedId
 * @param {User} user
 */
exports.unsubscribe = (feedId, user) => {
  const feed = new Feed({ id: feedId })
  feed.users().detach(user)
}

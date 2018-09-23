var rssfinder = require('rss-finder')

var ArticleService = require('../services/ArticleService')
var FeedService = require('../services/FeedService')
var User = require('../models/User')
var feedparser = require('../parsers/feeds')
var _ = require('lodash')

module.exports = {
  // Get all subscribed RSS Feed
  index: async (req, res) => {
    const user = await User.where('id', req.user.sub).fetch({
      withRelated: ['feeds']
    })
    return res.status(200).json({ feeds: user.related('feeds') })
  },
  // Get RSS feed link from website
  find: async (req, res) => {
    const feeds = await rssfinder({ url: req.query.url })
    return res.status(200).json(feeds)
  },
  // Subscribe to Feed
  create: async (req, res) => {
    const siteInfo = req.body.site_info
    const selectedFeeds = req.body.selected_feeds
    let feeds = []
    const user = new User({ id: req.user.sub })

    for (let i = 0; i < selectedFeeds.length; i++) {
      const feedExists = await FeedService.feedExists(selectedFeeds[i].url)
      const entries = []

      // If Feed doesn't exist
      if (!feedExists) {
        const feedItem = await feedparser.parseFeed(selectedFeeds[i].url)
        const savedFeed = await FeedService.storeFeed(siteInfo, feedItem, user)
        for (let k = 0; k < feedItem.posts.length; k++) {
          const article = await ArticleService.storeArticle(siteInfo, feedItem.posts[k], savedFeed.id)
          entries.push(article)
        }
        feeds.push({
          feed: savedFeed,
          entries: entries
        })
      } else {
        // If Feed exists and user is already subscribed
        const subscription = _.filter(feedExists.related('users').toArray(), { id: req.user.sub })

        if (subscription.length === 0) {
          feedExists.users().attach(user)
          feeds.push({
            feed: feedExists,
            entries: feedExists.related('entries').toArray()
          })
        } else {
          return res.status(400).json({
            message: 'Already subscribed to this feed'
          })
        }
      }
    }
    return res.status(200).json(feeds)
  },
  // Unsubscribe from Feed
  delete: async (req, res) => {
    const user = new User({ id: req.user.sub })
    try {
      FeedService.unsubscribe(req.params.id, user)
      return res.status(201).json({
        feed: req.params.id,
        message: 'Successfully unsubscribed feed'
      })
    } catch (e) {
      return res.status(400).json({
        message: e.message
      })
    }
  }
}

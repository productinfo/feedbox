const { Router } = require('express')

const router = Router()

// Get Feed list
router.get('/feeds', require('../controllers/FeedController').index)
// Find RSS from website
router.get('/rss', require('../controllers/FeedController').find)
// Create Feed
router.post('/feeds', require('../controllers/FeedController').create)
// Unsubscribe feed
router.delete('/feeds/:id', require('../controllers/FeedController').delete)

module.exports = router

const { Router } = require('express')

const router = Router()

// Get Feed list
router.get('/feeds', require('../controllers/FeedController').index)
// Create Feed
router.post('/feeds', require('../controllers/FeedController').create)

module.exports = router

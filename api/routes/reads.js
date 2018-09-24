const { Router } = require('express')

const router = Router()

// Mark as read
router.post('/reads/:id', require('../controllers/FavouriteController').markRead)
// Mark as unread
router.delete('/reads/:id', require('../controllers/FavouriteController').markUnread)

module.exports = router

const { Router } = require('express')

const router = Router()

// Get Feed list
router.get('/entries', require('../controllers/EntryController').index)
// Get specific article
router.get('/entries/:uuid', require('../controllers/EntryController').fetchArticle)
// Fetch article
router.get('/parse', require('../controllers/EntryController').parseArticle)

module.exports = router

const { Router } = require('express')

const router = Router()

// Mark as favourite
router.post('/favourites/:id', require('../controllers/FavouriteController').markFavourite)
// Mark as un favourite
router.delete('/favourites/:id', require('../controllers/FavouriteController').markUnfavourite)

module.exports = router

const { Router } = require('express')

const router = Router()

// Login
router.post('/login', require('../controllers/AuthController').login)
// Register User
router.post('/register', require('../controllers/AuthController').register)
// Forgot Password
router.post('/forgot', require('../controllers/AuthController').forgot)
// Reset Token check
router.get('/reset/:token', require('../controllers/AuthController').resetToken)
// Reset user's password
router.post('/reset/:token', require('../controllers/AuthController').resetEmail)
// Logout
router.post('/logout', function (req, res, next) {
  res.json({ status: 'OK' })
})

module.exports = router

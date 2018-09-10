const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
dotenv.config()

// Create express instnace
const app = express()

global.App = {}

App.Bookshelf = require('./bookshelf')

// Install middleware
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())

// Require API routes
const users = require('./routes/users')
const auth = require('./routes/auth')

// JWT middleware
app.use(
  jwt({
    secret: process.env.JWT_SECRET
  }).unless({
    path: [
      '/api/register',
      '/api/login',
      '/api/forgot',
      '/api/reset/:token'
    ]
  })
)

// Import API Routes
app.use(users)
app.use(auth)

// Error handler
app.use((err, req, res, next) => {
  console.error(err) // eslint-disable-line no-console
  res.status(401).send(err + '')
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

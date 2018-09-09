const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
dotenv.load()

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
  '/api',
  jwt({
    secret: 'dummy'
  }).unless({
    path: [
      '/api/register',
      '/api/login',
      '/api/proxy'
    ]
  })
)

// Import API Routes
app.use(users)
app.use(auth)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

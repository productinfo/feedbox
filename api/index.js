const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('express-jwt')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
dotenv.config()

// Create express instnace
const app = express()

// Install middleware
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())

// Require API routes
const users = require('./routes/users')
const auth = require('./routes/auth')
const feeds = require('./routes/feeds')
const entries = require('./routes/entries')
const favourites = require('./routes/favourites')
const reads = require('./routes/reads')

// JWT middleware
app.use(
  jwt({
    secret: process.env.JWT_SECRET
  }).unless({
    path: [
      '/api/register',
      '/api/login',
      '/api/forgot',
      /^\/api\/reset\/.*/
    ]
  })
)

// Import API Routes
app.use(users)
app.use(auth)
app.use(feeds)
app.use(entries)
app.use(favourites)
app.use(reads)

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

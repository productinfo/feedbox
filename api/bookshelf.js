const config = require('./knexfile')
const knex = require('knex')(config.development)
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin('registry')
bookshelf.plugin('virtuals')
bookshelf.plugin('visibility')
bookshelf.plugin('pagination')

module.exports = bookshelf

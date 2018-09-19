var Feed = require('./Feed')
var bookshelf = require('../bookshelf')

var Entry = bookshelf.Model.extend({
  tableName: 'entries',
  hasTimestamps: true,
  feed: () => {
    return this.belongsTo(Feed)
  }
})

module.exports = bookshelf.model('Entry', Entry)

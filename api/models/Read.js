var bookshelf = require('../bookshelf')
var User = require('./User')

var Read = bookshelf.Model.extend({
  tableName: 'reads',
  hasTimestamps: true,
  user: () => {
    return this.belongsTo(User)
  }
})

module.exports = bookshelf.model('Read', Read)

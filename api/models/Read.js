var bookshelf = require('../bookshelf')
require('./User')

var Read = bookshelf.Model.extend({
  tableName: 'reads',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User')
  }
})

module.exports = bookshelf.model('Read', Read)

var bookshelf = require('../bookshelf')
require('./Entry')
require('./User')

var Feed = bookshelf.Model.extend({
  tableName: 'feeds',
  hasTimestamps: true,
  entries: function () {
    return this.hasMany('Entry')
  },
  users: function () {
    return this.belongsToMany('User')
  }
})

module.exports = bookshelf.model('Feed', Feed)

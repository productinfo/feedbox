var bookshelf = require('../bookshelf')
var Entry = require('./Entry')
var User = require('./User')

var Feed = bookshelf.Model.extend({
  tableName: 'feeds',
  hasTimestamps: true,
  entries: () => {
    return this.hasMany(Entry)
  },
  user: () => {
    return this.belongsToMany(User)
  }
})

module.exports = bookshelf.model('Feed', Feed)

var bookshelf = require('../bookshelf')
var User = require('./User')

var Favourite = bookshelf.Model.extend({
  tableName: 'favourites',
  hasTimestamps: true,
  user: () => {
    return this.belongsTo(User)
  }
})

module.exports = bookshelf.model('Favourite', Favourite)

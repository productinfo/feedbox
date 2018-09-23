var bookshelf = require('../bookshelf')
require('./User')

var Favourite = bookshelf.Model.extend({
  tableName: 'favourites',
  hasTimestamps: true,
  user: function () {
    return this.belongsTo('User')
  }
})

module.exports = bookshelf.model('Favourite', Favourite)

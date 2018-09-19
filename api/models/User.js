var bcrypt = require('bcryptjs')
var bookshelf = require('../bookshelf')
var Feed = require('./Feed')
var Favourite = require('./Favourite')
var Read = require('./Read')

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function () {
    this.on('saving', this.hashPassword, this)
  },
  hashPassword: function (model, attrs, options) {
    let password = options.patch ? attrs.password : model.get('password')
    if (!password) { return }
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    model.set('password', hash)
  },
  comparePassword: function (password, done) {
    bcrypt.compare(password, this.get('password'), function (err, isMatch) {
      done(err, isMatch)
    })
  },
  hidden: ['password', 'passwordResetToken', 'passwordResetExpires'],
  feeds: () => {
    return this.belongsToMany(Feed)
  },
  favourites: () => {
    return this.hasMany(Favourite)
  },
  reads: () => {
    return this.hasMany(Read)
  }
})

module.exports = bookshelf.model('User', User)

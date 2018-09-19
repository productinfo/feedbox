var Feed = require('../models/Feed')

module.exports = {
  index: (req, res) => {
    return res.status(200).json({ user: req.user.sub })
  },
  create: (req, res) => {
    return res.status(200).json({ user: req.user.sub })
  }
}

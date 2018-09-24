var Read = require('../models/Read')

module.exports = {
  // Mark as read
  markRead: async (req, res) => {
    const readExists = await Read.where({
      user_id: req.user.sub,
      entry_id: req.params.id
    }).count()
    if (!readExists) {
      const read = new Read({
        user_id: req.user.sub,
        entry_id: req.params.id
      })
      const readItem = await read.save()
      return res.status(200).json({
        read: readItem,
        message: 'Mark as read'
      })
    }

    return res.status(400).json({
      message: 'Already marked as favourite'
    })
  },
  // Mark as unread
  markUnread: async (req, res) => {
    await Read.where({ entry_id: req.params.id, user_id: req.user.sub }).destroy()
    return res.status(200).json({
      entry_id: req.params.id,
      message: 'Mark as un-favourite'
    })
  }
}

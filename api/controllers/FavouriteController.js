var Favourite = require('../models/Favourite')

module.exports = {
  // Mark as favourite
  markFavourite: async (req, res) => {
    const favouriteExists = await Favourite.where({
      user_id: req.user.sub,
      entry_id: req.params.id
    }).count()
    if (!favouriteExists) {
      const favourite = new Favourite({
        user_id: req.user.sub,
        entry_id: req.params.id
      })
      const favouriteItem = await favourite.save()
      return res.status(200).json({
        favourite: favouriteItem,
        message: 'Mark as favourited'
      })
    }

    return res.status(400).json({
      message: 'Already marked as favourite'
    })
  },
  // Mark as unfavourite
  markUnfavourite: async (req, res) => {
    await Favourite.where({ entry_id: req.params.id, user_id: req.user.sub }).destroy()
    return res.status(200).json({
      entry_id: req.params.id,
      message: 'Mark as un-favourite'
    })
  }
}

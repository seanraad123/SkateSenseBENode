const Spot = require('../../models/spot');
const User = require('../../models/user')


module.exports = async function deleteBookmark({ bookmarkInput }, req) {

  // deconstruct
  const { spot_id, user_id } = bookmarkInput;

  const userToUpdate = await User.findOne({_id: user_id })

  let index = userToUpdate.bookmarks.indexOf(spot_id);

  console.log('WAHT IS INDEX', userToUpdate)

  let newArray = []
  if (index >= 0) {
    newArray = userToUpdate.bookmarks.splice( index, 1 );
  }

  // const user = User.findOne({_id: user_id})
  const user = User.findOneAndUpdate(
    { _id: user_id },
    { $set: { bookmarks: newArray } }
  )

  return user
};
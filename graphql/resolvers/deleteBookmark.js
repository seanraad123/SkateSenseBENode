const Spot = require('../../models/spot');
const User = require('../../models/user');

module.exports = async function deleteBookmark({ bookmarkInput }, req, res) {
  // if (!req.isAuth) {
  //   const error = new Error('Not authenticated!');
  //   error.code = 401;
  //   throw error;
  // }

  console.log('BOOKMARK INPUT user id', bookmarkInput.user_id);
  console.log('BOOKMARK INPUT spot id', bookmarkInput.spot_id);

  // deconstruct
  const { spot_id, user_id } = bookmarkInput;

  const userToUpdate = await User.findOne({ _id: user_id });

  const index = userToUpdate.bookmarks.indexOf(spot_id);

  // console.log('WAHT IS INDEX', userToUpdate);

  console.log('index', index);

  console.log('before', userToUpdate.bookmarks);

  let user;

  if (userToUpdate.bookmarks.length === 1) {
    await User.findOneAndUpdate({ _id: user_id }, { bookmarks: [] });
    user = await User.findOne({ _id: user_id });
    console.log('line 32 after', user.bookmarks);
    return user;
  }

  userToUpdate.bookmarks.splice(index, 1);

  await User.findOneAndUpdate({ _id: user_id }, { $set: { bookmarks: userToUpdate.bookmarks } });

  user = await User.findOne({ _id: user_id });

  console.log('line 42 after', user.bookmarks);

  return user;
};

const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async function deleteBookmark({ bookmarkInput }, req, res) {
  const { spot_id, user_id } = bookmarkInput;

  const token = req.request.headers.authorization.split('Bearer ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return new Error('Not and authenticated user');
  }

  console.log(decoded);

  let userToUpdate;

  try {
    userToUpdate = await User.findOne({ _id: decoded.user_id });
  } catch (e) {
    return new Error("User doesn't exist");
  }

  const index = userToUpdate.bookmarks.indexOf(spot_id);

  let newArray = [];
  if (index !== -1) {
    userToUpdate.bookmarks.splice(index, 1);
    newArray = userToUpdate.bookmarks;
  }

  userToUpdate.save();

  return userToUpdate.bookmarks;
};

const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async function deleteBookmark({ bookmarkInput }, req, res) {
  if (req.request.isAuth) {
    const { spot_id, user_id } = bookmarkInput;

    const token = req.request.headers.authorization.split('Bearer ')[1];

    let decoded = jwt.verify(token, process.env.SECRET_KEY);

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
  } else {
    return new Error('Not authenticated');
  }
};

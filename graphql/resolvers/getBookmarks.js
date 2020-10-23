const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async function getBookmarks({ user_id }, req) {
  const token = req.request.headers.authorization.split('Bearer ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return new Error('Not and authenticated user');
  }

  const user = await User.findOne({ _id: user_id }).populate([
    {
      path: 'bookmarks',
      model: 'Spot',
      populate: [
        { path: 'images', model: 'Image' },
        { path: 'location', model: 'Location' },
      ],
    },
  ]);

  if (user === null) {
    const userError = new Error('Cannot find user');
    userError.code = 404;

    throw userError;
  } else return user.bookmarks;
};

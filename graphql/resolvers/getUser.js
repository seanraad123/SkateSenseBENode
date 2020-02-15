const User = require('../../models/user');

module.exports = async function getUser({ user_id }, req, res) {
  // if (!res.request.isAuth) {
  //   const error = new Error('Not authenticated!');
  //   error.code = 401;
  //   throw error;
  // }

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
  } else return user;
};

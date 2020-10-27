const User = require('../../models/user');

module.exports = async function getSpotOwner({ user_id }, req, res) {
  if (req.request.isAuth) {
    let user;

    try {
      user = await User.findOne({ _id: user_id });
    } catch (e) {
      console.log(e);
    }

    if (user === null) {
      const userError = new Error('Cannot find user');
      userError.code = 404;

      return userError;
    }

    return user;
  } else {
    return new Error('Not authenticated');
  }
};

const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async function getUsers(req, res) {
  if (res.request.isAuth) {
    const userList = await User.find({}).populate([
      {
        path: 'bookmarks',
        path: 'spots',
        populate: [
          { path: 'images', model: 'Image' },
          { path: 'location', model: 'Location' },
        ],
      },
    ]);

    if (userList === null) {
      const errorGetUsers = new Error('Cannot find users');
      errorGetUsers.code = 404;
      throw errorGetUsers;
    }

    return userList;
  } else {
    return new Error('Not authenticated');
  }
};

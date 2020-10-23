const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async function getUsers(request, res) {
  const token = req.request.headers.authorization.split('Bearer ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return new Error('Not and authenticated user');
  }

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
};

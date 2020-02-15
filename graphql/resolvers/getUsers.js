const User = require('../../models/user');

module.exports = async function getUsers(request, res) {
  // console.log('WHAT IS REQUEST', request);
  // console.log('WHAT IS res', res.request.isAuth);
  // console.log('graphQLParams', graphQLParams);

  if (!res.request.isAuth) {
    const error = new Error('Not authenticated!');
    error.code = 401;
    throw error;
  }

  const userList = await User.find({}).populate([
    {
      path: 'bookmarks',
      model: 'Spot',
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

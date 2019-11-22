const User = require("../../models/user");

module.exports = async function getUsers(req) {
  const userList = await User.find({}).populate([
    {
      path: 'bookmarks',
      model: 'Spot',
      populate: [
        {path: 'images', model: 'Image'}, 
        {path: 'location', model: 'Location' }
      ]
    }
  ]);

  if (userList === null) {
    const errorGetUsers = new Error("Cannot find users");
    errorGetUsers.code = 404;

    throw errorGetUsers;
  }
  else return userList;
}
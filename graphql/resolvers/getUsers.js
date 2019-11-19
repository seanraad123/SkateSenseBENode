const User = require("../../models/user");

module.exports = async function getUsers(req) {
    const userList = await User.find({});
    
  if (userList === null) {
    const errorGetUsers = new Error('{"errorGetUsers":"Cannot find users"}');
    errorGetUsers.code = 404;

    throw errorGetUsers;
  }
  else return userList;
}
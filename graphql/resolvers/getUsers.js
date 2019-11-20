const User = require("../../models/user");
const bcrypt = require("bcryptjs");

module.exports = async function getUsers(req) {
  const userList = await User.find({});

  console.log(userList)
  
  if (userList === null) {
    const errorGetUsers = new Error("Cannot find users");
    errorGetUsers.code = 404;

    throw errorGetUsers;
  }
  else return userList;
}
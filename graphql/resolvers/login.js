const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../../models/user");
const setting = require("../../settings/settings");

module.exports = async function login({ email, password }) {
  // find user

  if (!validator.isEmail(email)) {
    return new Error("Invalid email format");
  }
  if (validator.isEmpty(password)) {
    return new Error("Password is empty");
  }

  let user;
  try {
    user = await User.findOne({ email });
  } catch (errorFindUser) {
    return new Error(
      "There is no user registred with this email. Sign in or try again with another email"
    );
  }

  // compare password
  if (!(await bcrypt.compare(password, user.password))) {
    return new Error("Password is incorrect.");
  }

  console.log(user.bookmarks)

  // create token
  try {
    const token = jwt.sign(
      {
        user_id: user._id.toString(),
        email: user.email,
      },
      setting.system.secretkey,
      { expiresIn: "24h" }
    );

    return {
      token,
      user_id: user._id.toString(),
      email: user.email,
      name: user.name,
      bookmarks: user.bookmarks
    };
  } catch (errorCreateToken) {
    return new Error("Cannot create a token");
  }
};

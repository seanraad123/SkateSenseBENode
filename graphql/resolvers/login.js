const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const setting = require("../../settings/app");
const validator = require("validator");

module.exports = async function login({ email, password }) {
  // find user
  const errors = [];
  if (!validator.isEmail(email)) {
    errors.push({
      message: '"error_email":"Invalid email format"',

    });
  }
  if (validator.isEmpty(password)) {
    errors.push({
      message: '"error_password":"Password is empty"',

    });
  }
  if (errors.length <= 0) {
    let user;
    try {
      user = await User.findOne({ email });
      console.log(user)
    } catch (errorFindUser) {
      errors.push({
        message: '"errorFindUser":"There is no user registred with this email. Sign in or try again with another email"',

      });
    }
    // compare password
    if (errors.length <= 0) {
      if (!(await bcrypt.compare(password, user.password))) {
        errors.push({
          message: '"errorIsEqual":"Password is incorrect."',

        });
      }
      if (errors.length <= 0) {
        // create token
        try {
          const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
          },
            setting.system.secretkey,
            { expiresIn: "24h" }
          );
          return {
            token,
            userId: user._id.toString(),
            userEmail: user.email,
            userName: user.name,
            role: user.role,
            profilepic: user.profilepic,
            parent_company: user.parent_company
          };
        } catch (errorCreateToken) {
          errors.push({
            message: '"errorCreateToken":"Cannot create a token"',

          });
        }
      }
    }
  }
  if (errors.length > 0) {
    let msg = "{";
    /// get error messages and output them
    for (err of errors) {
      msg += msg === "{" ? err.message : "," + err.message;
    }
    msg += "}";
    const errorLogin = new Error(msg);
    throw errorLogin;
  }
}

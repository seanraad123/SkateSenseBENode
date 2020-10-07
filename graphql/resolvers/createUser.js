const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const setting = require("../../settings/settings");

module.exports = async function createUser({ userInput }, req) {
  console.log(userInput.email);
  if (!validator.isEmail(userInput.email)) {
    return new Error("E-Mail is invalid");
  }

  if (validator.isEmpty(userInput.name)) {
    return new Error("name is invalid.");
  }

  if (
    validator.isEmpty(userInput.password) ||
    !validator.isLength(userInput.password, { min: 5 })
  ) {
    return new Error("Password too short!");
  }

  const existingEmail = await User.findOne({ email: userInput.email });
  if (existingEmail !== null) {
    return new Error(`${userInput.email} exists already!`);
  }

  const existingUser = await User.findOne({ name: userInput.name });
  if (existingUser !== null) {
    return new Error(`${userInput.name} exists already!`);
  }

  const hashedPw = await bcrypt.hash(userInput.password, 12);
  let createdUser;
  try {
    createdUser = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw,
    });

    await createdUser.save();
  } catch (errorCreateingUser) {
    return new Error("Cannot create the user");
  }

  const token = jwt.sign(
    {
      userID: createdUser._id.toString(),
      email: createdUser.email,
    },
    setting.system.secretkey,
    { expiresIn: "24h" }
  );

  console.log(createdUser._doc, token);

  return {
    email: createdUser.email,
    name: createdUser.name,
    user_id: createdUser._id.toString(),
    token,
  };
};

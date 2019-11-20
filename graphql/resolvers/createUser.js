const User = require("../../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = async function createUser({ userInput }, req) {

    if (!validator.isEmail(userInput.email)) {
        throw new Error("E-Mail is invalid")
    }

    if (validator.isEmpty(userInput.name)) {
        throw new Error("name is invalid.")
    }

    if (
        validator.isEmpty(userInput.password) ||
        !validator.isLength(userInput.password, { min: 5 })
    ) {
        throw new Error("Password too short!")
    }

    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser !== null) {    
        throw new Error(`User with the address ${userInput.email} exists already!`)
    }

    const hashedPw = await bcrypt.hash(userInput.password, 12);
    let createdUser;
    try {
        createdUser = new User({
            email: userInput.email,
            name: userInput.name,
            password: userInput.password,
        });

        await createdUser.save();
    }
    catch (errorCreateingUser) {
        throw new Error("Cannot create the user")
    }
        
    return {
        ...createdUser._doc,
        _id: createdUser._id.toString(),
    };
}
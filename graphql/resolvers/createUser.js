const User = require("../../models/user");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = async function createUser({ userInput }, req) {
    const errors = []

    if (!validator.isEmail(userInput.email)) {
        errors.push({ message: '"error_email":"E-Mail is invalid."' });
    }

    if (validator.isEmpty(userInput.name)) {
        errors.push({ message: '"error_name":"name is invalid."' });
    }

    if (
        validator.isEmpty(userInput.password) ||
        !validator.isLength(userInput.password, { min: 5 })
    ) {
        errors.push({ message: '"error_Password":"Password too short!"' });
    }

    const existingUser = await User.findOne({ email: userInput.email });
    if(existingUser !== null){    
        errors.push({ message: `"errorExistingUser":"User with the address ${existingUser.email} exists already!"` });
    }

    if (errors.length <= 0) {
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
            errors.push({ message: '"errorCreateingUser":"Cannot create the user"' });
        }
            
        if (errors.length <= 0) {
            return {
                ...createdUser._doc,
                _id: createdUser._id.toString(),
            };
        }
    }

    if (errors.length > 0) {
        let msg = "{";
        /// get error messages and output them
        for (err of errors) {
          msg += msg === "{" ? err.message : "," + err.message;
        }
        msg += "}";
        const error = new Error(msg);
        throw error;
      }

}
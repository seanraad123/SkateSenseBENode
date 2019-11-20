const User = require("../../models/User")

module.exports = async function deleteUser({ _id }, req) {
    
    try{
        const user = await User.findById(_id);
    }
    catch (e){
        throw new Error ('Could not find user')
    }

    await User.findByIdAndDelete({
        _id
    });

    return "User was deleted";
}
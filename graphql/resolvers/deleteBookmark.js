const User = require('../../models/user')
const jwt = require("jsonwebtoken");
const setting = require("../../settings/settings");


module.exports = async function deleteBookmark({ bookmarkInput }, req) {

  // deconstruct
  const { spot_id, user_id } = bookmarkInput;

  const token = req.request.headers.authorization.split("Bearer ")[1]
  let decoded

  try {
    decoded = jwt.verify(token, setting.system.secretkey);
  } catch(err) {
    return new Error("Not and authenticated user")
  }

  console.log(decoded)

  let userToUpdate

  try{
    userToUpdate= await User.findOne({_id: decoded.user_id })
  }catch(e){
    return new Error("User doesn't exist")
  }

  console.log("USER: ", userToUpdate)

  console.log("USER BOOKMARKS", userToUpdate.bookmarks)

  const index = userToUpdate.bookmarks.indexOf(spot_id);

  console.log("INDEX: ", index)



  let newArray = []
  if (index !== -1) {
    userToUpdate.bookmarks.splice( index, 1 );
    newArray = userToUpdate.bookmarks
  }
  
  userToUpdate.save()
  
  return userToUpdate.bookmarks
};
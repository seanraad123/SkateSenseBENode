const User = require('../../models/user');
const jwt = require("jsonwebtoken");
const Spot = require('../../models/spot');
const setting = require("../../settings/settings");

module.exports = async function createBookmark({ bookmarkInput }, req) {
  // deconstruct
  const { spot_id, user_id } = bookmarkInput;

  const token = req.request.headers.authorization.split("Bearer ")[1]
  let decoded

  try {
    decoded = jwt.verify(token, setting.system.secretkey);
  } catch(err) {
    return new Error("Not an authenticated user")
  }

  // start try block
  try {
    // find spot
    const spot = await Spot.findOne({ _id: spot_id });
    // if no spot found and no error is thrown return your own
    if (!spot) {
      return new Error('420: No spot found.');
    }

    // get user
    const user = await User.findOne({_id: decoded.user_id })
    if (!user) {
      return new Error('423: No user found.');
    }

    if(user.bookmarks.some(i => i.toString() === spot_id)){
      return new Error('Spot already bookmarked')
    }else{
      user.bookmarks.push(spot_id)
      user.save();
    }
    
    return user.bookmarks
    
  } catch (e) {
    throw new Error(e);
  }
};

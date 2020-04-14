const User = require('../../models/user');
const Spot = require('../../models/spot');

module.exports = async function createBookmark({ bookmarkInput }, req, res) {
  // if (!req.isAuth) {
  //   const error = new Error('Not authenticated!');
  //   error.code = 401;
  //   throw error;
  // }

  // deconstruct
  const { spot_id, user_id } = bookmarkInput;

  // ? get user id from req
  // ? !isUser send error

  // start try block
  try {
    // find spot
    const spot = await Spot.findOne({ _id: spot_id });
    // if no spot found and no error is thrown return your own
    if (!spot) {
      throw new Error('420: No spot found.');
    }

    const user = await User.findOne({_id: user_id})

    if (user.bookmarks.includes(spot._id)){
      return spot
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          bookmarks: spot_id,
        },
      }
    );

    // no user found and no error thrown return your own
    if (!updatedUser) {
      throw new Error('423: No user found.');
    }
    return spot;
  } catch (e) {
    throw new Error(e);
  }
};

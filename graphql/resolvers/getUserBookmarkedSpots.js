const Spot = require('../../models/spot');
const User = require('../../models/user');

module.exports = async function getUserBookmarkedSpots({ user_id }, req, res) {
  // if (!req.isAuth) {
  //   const error = new Error('Not authenticated!');
  //   error.code = 401;
  //   throw error;
  // }

  const userBookmarkedSpotList = await User.find({ _id: user_id }).populate([
    {
      path: 'bookmarks',
      model: 'Spot',
      populate: [
        { path: 'images', model: 'Image' },
        { path: 'location', model: 'Location' },
      ],
    },
  ]);

  console.log(userBookmarkedSpotList[0].bookmarks);

  if (userBookmarkedSpotList === null) {
    throw new Error('You have no bookmarked spots');
  }

  return userBookmarkedSpotList;
};

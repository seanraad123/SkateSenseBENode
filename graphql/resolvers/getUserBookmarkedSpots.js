const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async function getUserBookmarkedSpots({ user_id }, req, res) {
  const token = req.request.headers.authorization.split('Bearer ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return new Error('Not and authenticated user');
  }

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

  if (userBookmarkedSpotList === null) {
    throw new Error('You have no bookmarked spots');
  }

  return userBookmarkedSpotList;
};

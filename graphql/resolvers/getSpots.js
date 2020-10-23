const Spot = require('../../models/spot');
const jwt = require('jsonwebtoken');

module.exports = async function getSpots({ locationInput }, req, res) {
  const token = req.request.headers.authorization.split('Bearer ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return new Error('Not and authenticated user');
  }

  const spotList = await Spot.find({ approved: true }).populate([
    {
      path: 'images',
      model: 'Image',
    },
    {
      path: 'location',
      model: 'Location',
    },
    {
      path: 'bookmarks',
      model: 'Bookmark',
      populate: { path: 'user', model: 'User' },
    },
    {
      path: 'users',
      model: 'User',
      populate: { path: 'user', model: 'User' },
    },
  ]);

  if (spotList === null) {
    throw new Error('Cannot find spots');
  }

  return spotList;
};

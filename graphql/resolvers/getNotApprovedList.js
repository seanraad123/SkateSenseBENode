const Spot = require('../../models/spot');
const Bookmark = require('../../models/bookmark');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async function getNotApprovedList(req, res) {
  const token = req.request.headers.authorization.split('Bearer ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return new Error('Not and authenticated user');
  }

  const spotList = await Spot.find({ approved: false }).populate([
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
      path: 'owner',
      model: 'User',
      populate: { path: 'user', model: 'User' },
    },
  ]);

  console.log('SPOTLIST', spotList);

  if (spotList === null) {
    throw new Error('Cannot find spots');
  }

  return spotList;
};

const Spot = require('../../models/spot');
const Bookmark = require('../../models/bookmark');
const User = require('../../models/user');

module.exports = async function getSpots(req) {
  const spotList = await Spot.find({}).populate([
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
    throw new Error('Cannot find users');
  }

  return spotList;
};

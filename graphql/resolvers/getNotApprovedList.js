const Spot = require('../../models/spot');
const Bookmark = require('../../models/bookmark');
const User = require('../../models/user');

module.exports = async function getNotApprovedList(req, res) {
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

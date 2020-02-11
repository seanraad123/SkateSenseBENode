const Spot = require('../../models/spot');

module.exports = async function getUserCreatedSpots({ user_id }, req) {
  console.log('getting here', user_id);

  const userCreatedSpotsList = await Spot.find({ owner: user_id }).populate([
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
  ]);

  if (userCreatedSpotsList === null) {
    throw new Error('You have no created spots');
  }

  return userCreatedSpotsList;
};

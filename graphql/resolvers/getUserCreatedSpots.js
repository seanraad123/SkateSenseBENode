const Spot = require('../../models/spot');

module.exports = async function getUserCreatedSpots({ user_id }, req, res) {
  // if (!res.request.isAuth) {
  //   const error = new Error('Not authenticated!');
  //   error.code = 401;
  //   throw error;
  // }

  const userCreatedSpotsList = await Spot.find({ owner: user_id }).populate([
    {
      path: 'images',
      model: 'Image',
    },
    {
      path: 'location',
      model: 'Location',
    },
  ]);

  if (userCreatedSpotsList === null) {
    throw new Error('You have no created spots');
  }

  return userCreatedSpotsList;
};

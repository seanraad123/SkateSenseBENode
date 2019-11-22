const Spot = require('../../models/spot');

module.exports = async function getBookmarkedSpots({ user_id }, req) {
  const test = await Spot.find({ user_id });
  console.log(test);


  const bookmarkedSpotsList = await Spot.find({ user_id }).populate([

  ]);

  if (bookmarkedSpotsList === null) {
    throw new Error('You have no spots bookmarked');
  }


  return bookmarkedSpotsList;
};


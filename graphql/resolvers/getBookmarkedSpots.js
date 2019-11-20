const Spot = require("../../models/spot");

module.exports = async function getBookmarkedSpots( { user_id }, req) {

  const bookmarkedSpotsList = await Spot.find({ owner: user_id }).populate([
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
        populate: { path: 'user', model: 'User'}
    },
  ]);
  
  if (bookmarkedSpotsList === null) {
    throw new Error("Cannot find users");
  }


  return bookmarkedSpotsList;
}
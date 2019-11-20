const Spot = require("../../models/spot");

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
    },
  ]);
  
  if (spotList === null) {
    throw new Error("Cannot find users");
  }

  return spotList;
}
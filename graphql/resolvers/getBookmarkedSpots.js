const Spot = require("../../models/spot");
const Bookmark = require("../../models/bookmark")

module.exports = async function getBookmarkedSpots( { user_id }, req) {

    const test = await Bookmark.find({ user_id })
    console.log(test);
    

    const bookmarkedSpotsList = await Bookmark.find({ user_id }).populate([
        {
            path: 'spot',
            model: 'Spot',
        },
    ]);
  
  if (bookmarkedSpotsList === null) {
    throw new Error("You have no spots bookmarked");
  }


  return bookmarkedSpotsList;
  
}
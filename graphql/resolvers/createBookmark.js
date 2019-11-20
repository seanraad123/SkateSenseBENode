const Bookmark = require("../../models/bookmark")
const User = require("../../models/user")
const Spot = require("../../models/spot")

module.exports = async function createBookmark({ bookmarkInput }, req) {

    const existingBookmark = await Bookmark.findOne(
        { spot_id: bookmarkInput.spot_id, user_id: bookmarkInput.user_id }
    );

    if(existingBookmark !== null){
        throw new Error("Spot has already been bookmarked")
    }
    
    try {
        let createdBookmark = new Bookmark({
            user_id: bookmarkInput.user_id,
            spot_id: bookmarkInput.spot_id,
        });

        await createdBookmark.save();


        await User.findOneAndUpdate(
            { _id: bookmarkInput.user},
            { $set: { "bookmarks" : [createdBookmark._id] } }
        )

        await Spot.findOneAndUpdate(
            { _id: bookmarkInput.spot},
            { $set: { "bookmarks" : [createdBookmark._id] } }
        )


        return {
            ...createdBookmark._doc,
            _id: createdBookmark._id.toString(),
        };
        
    } catch (e) {
        return new Error(e)
    }

}
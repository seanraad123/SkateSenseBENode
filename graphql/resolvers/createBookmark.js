const Bookmark = require("../../models/bookmark")
const User = require("../../models/user")
const Spot = require("../../models/spot")

module.exports = async function createBookmark({ bookmarkInput }, req) {

    const existingBookmark = await Bookmark.findOne(
        { spot: bookmarkInput.spot, user: bookmarkInput.user }
    );

    if(existingBookmark !== null){
        throw new Error("Spot has already been bookmarked")
    }
    
    try {
        let createdBookmark = new Bookmark({
            user: bookmarkInput.user,
            spot: bookmarkInput.spot,
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
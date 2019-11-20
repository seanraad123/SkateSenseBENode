const Bookmark = require("../../models/bookmark")


module.exports = async function deleteBookmark({ _id }, req) {
    
    try{
        const bookmark = await Bookmark.findById(_id);
    }
    catch (e){
        throw new Error ('Could not find bookmark')
    }

    await Bookmark.findByIdAndDelete({
        _id
    });

    return "Bookmark was deleted";
}
const Spot = require("../../models/spot")


module.exports = async function deleteSpot({ _id }, req) {
    
    try{
        const spot = await Spot.findById(_id);
    }
    catch (e){
        throw new Error ('Could not find spot')
    }

    await Spot.findByIdAndDelete({
        _id
    });

    return "Spot was deleted";
}
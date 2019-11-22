const Spot = require("../../models/spot")


module.exports = async function deleteSpot({ _id }, req) {

  const user_id = '5dd741edb65656757bb522c6'
  let spot = ''

  try{
    spot = await Spot.findById(_id);
  }catch(e){
    throw new Error('Unable to find spot')
  }

  try{
    if (spot.owner.toString() === user_id.toString()) {
      await Spot.findByIdAndDelete({_id});
    }
  }catch(e){
    throw new Error('You do not own this spot')
  }
  
  
  return "Spot was deleted";
  
      
}
const Spot = require("../../models/spot")
const jwt = require("jsonwebtoken");
const setting = require("../../settings/settings");

module.exports = async function deleteSpot({ _id }, req) {

  const token = req.request.headers.authorization.split("Bearer ")[1]
  let decoded

  try {
    decoded = jwt.verify(token, setting.system.secretkey);
  } catch(err) {
    console.log(err)
  }

  let spot = ''

  try{
    spot = await Spot.findById(_id);
  }catch(e){
    throw new Error('Unable to find spot')
  }

  if (spot.owner.toString() === decoded.user_id) {
    await Spot.findByIdAndDelete(_id, function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          console.log("Deleted : ", docs); 
      }
    })
  }

  
  return "Spot was deleted";
  
      
}
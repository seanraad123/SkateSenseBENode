const Spot = require('../../models/spot');

module.exports = async function deleteSpot({ _id }, req, res) {
  // if (!req.isAuth) {
  //   const error = new Error('Not authenticated!');
  //   error.code = 401;
  //   throw error;
  // }

  // const user_id = '5dd741edb65656757bb522c6';
  let spot = '';
  let spotToDelete = spot;

  const token = req.request.headers.authorization.split("Bearer ")[1]
  let decoded

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch(err) {
    console.log(err)
  }

  let spot = ''

  try{
    spot = await Spot.findById(_id);
  } catch (e) {
    throw new Error('Unable to find spot');
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

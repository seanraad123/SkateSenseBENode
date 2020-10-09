const Spot = require('../../models/spot');
const jwt = require("jsonwebtoken");

module.exports = async function approveSpotMutation({ _id }, req, res) {
  // if (!req.isAuth) {
  //   const error = new Error('Not authenticated!');
  //   error.code = 401;
  //   throw error;
  // }

  // const user_id = '5dd741edb65656757bb522c6';

  console.log(_id)

  const token = req.request.headers.authorization.split("Bearer ")[1]
  let decoded

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch(err) {
    return new Error('Not authenticated')
  }

  let spot = ''

  try{
    spot = await Spot.findById(_id);
  } catch (e) {
    throw new Error('Unable to find spot');
  }

  spot.approved = true;
  spot.save();

  
  return "Spot was approved!";
  
      
}

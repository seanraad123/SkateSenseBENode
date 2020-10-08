const Spot = require('../../models/spot');
const jwt = require("jsonwebtoken");

module.exports = async function getUserCreatedSpots({ locationInput }, req, res) {



  const token = req.request.headers.authorization.split("Bearer ")[1]
  let decoded

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch(err) {
    return new Error('Not authenticated')
  }

  const userCreatedSpotsList = await Spot.find({ owner: decoded.user_id }).populate([
    {
      path: 'images',
      model: 'Image',
    },
    {
      path: 'location',
      model: 'Location',
    },
  ]);

    console.log(userCreatedSpotsList)
    console.log(locationInput)


  if (userCreatedSpotsList === null) {
    throw new Error('You have no created spots');
  }

  return userCreatedSpotsList.reverse();
};
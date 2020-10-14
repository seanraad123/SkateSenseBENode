const Spot = require('../../models/spot');
const jwt = require("jsonwebtoken");
const distance = require('../../utils/distanceCalc')

module.exports = async function getUserCreatedSpots({ locationInput }, req, res) {

  const token = req.request.headers.authorization.split("Bearer ")[1]
  let decoded

  console.log(token)
  console.log(jwt.verify(token, process.env.SECRET_KEY))

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

  let createdSpots = userCreatedSpotsList.map( i => {
    console.log(distance(i.location.latitude, i.location.longitude, locationInput.latitude, locationInput.longitude))

    i.distance = distance(i.location.latitude, i.location.longitude, locationInput.latitude, locationInput.longitude)
    return i
  })


  createdSpots.sort((a, b) => {
    return a.distance - b.distance
  })

  if (createdSpots === null) {
    throw new Error('You have no created spots');
  }

  return createdSpots;
};
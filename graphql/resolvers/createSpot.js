const Spot = require('../../models/spot');
const Location = require('../../models/location');
const Image = require('../../models/image');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = async function createSpot({ spotInput }, req, res) {
  if (req.request.isAuth) {
    const owner = await User.findOne({ _id: spotInput.owner });

    try {
      const createdLocation = new Location({
        latitude: spotInput.location.latitude,
        longitude: spotInput.location.longitude,
      });

      await createdLocation.save();

      const images = spotInput.images.map(async i => {
        const createdImage = new Image({
          base64: i.base64,
        });
        await createdImage.save();
        return createdImage;
      });

      const imageObjects = await Promise.all(
        images.map(async image => {
          return await image;
        })
      );

      const imageIDs = imageObjects.map(i => i._id);

      const createdSpot = new Spot({
        name: spotInput.name,
        owner: spotInput.owner,
        kickout_level: spotInput.kickout_level,
        description: spotInput.description,
        location: createdLocation._id,
        images: imageIDs,
        approved: false,
        spotType: spotInput.spotType,
        contains: spotInput.contains,
      });

      await createdSpot.save();

      owner.spots.push(createdSpot);
      owner.save();

      return {
        ...createdSpot._doc,
        _id: createdSpot._id.toString(),
      };
    } catch (e) {
      return new Error(e);
    }
  } else {
    return new Error('Not authenticated');
  }
};

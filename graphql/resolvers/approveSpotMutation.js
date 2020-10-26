const Spot = require('../../models/spot');
const jwt = require('jsonwebtoken');

module.exports = async function approveSpotMutation({ _id }, req, res) {
  if (res.request.isAuth) {
    let spot = '';

    try {
      spot = await Spot.findById(_id);
    } catch (e) {
      throw new Error('Unable to find spot');
    }

    spot.approved = true;
    spot.save();

    return 'Spot was approved!';
  } else {
    return new Error('Not authenticated');
  }
};

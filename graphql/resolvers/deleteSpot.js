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

  try {
    spot = await Spot.findById(_id);
  } catch (e) {
    throw new Error('Unable to find spot');
  }

  try {
    await Spot.findByIdAndDelete({ _id });
  } catch (e) {
    throw new Error('You do not own this spot');
  }

  return _id;
};

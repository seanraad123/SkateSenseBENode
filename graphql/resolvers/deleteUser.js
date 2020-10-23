const User = require('../../models/User');
const jwt = require('jsonwebtoken');

module.exports = async function deleteUser({ _id }, req, res) {
  const token = req.request.headers.authorization.split('Bearer ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return new Error('Not and authenticated user');
  }

  try {
    const user = await User.findById(_id);
  } catch (e) {
    throw new Error('Could not find user');
  }

  await User.findByIdAndDelete({
    _id,
  });

  return 'User was deleted';
};

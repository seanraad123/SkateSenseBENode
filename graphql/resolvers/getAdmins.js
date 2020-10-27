const User = require('../../models/user');

module.exports = async function getAdmins(req, res) {
  if (res.request.isAuth) {
    const admins = await User.find({ admin: true });

    if (admins === null) {
      return new Error('No admins');
    }

    return admins;
  } else {
    return new Error('Not authenticated');
  }
};

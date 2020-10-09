module.exports = {
  getUsers: require('./getUsers'),
  getSpots: require('./getSpots'),
  getUserCreatedSpots: require('./getUserCreatedSpots'),
  getUserBookmarkedSpots: require('./getUserBookmarkedSpots'),
  deleteUser: require('./createUser'),
  createUser: require('./createUser'),
  createSpot: require('./createSpot'),
  deleteSpot: require('./deleteSpot'),
  createBookmark: require('./createBookmark'),
  deleteBookmark: require('./deleteBookmark'),
  getBookmarks: require('./getBookmarks'),
  login: require('./login'),
  getNotApprovedList: require('./getNotApprovedList'),
  approveSpotMutation: require('./approveSpotMutation')
};

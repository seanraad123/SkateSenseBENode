const Spot = require('../../models/spot');
const User = require('../../models/user')


module.exports = async function deleteBookmark({ bookmarkInput }, req) {
  console.log(req);
  

    // deconstruct
  const { spot_id } = bookmarkInput;


 

  return 'Bookmark was deleted';
};
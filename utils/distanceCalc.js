module.exports = function distance(lon1, lat1, lon2, lat2){
  const R = 6371; // Radius of the earth in km

  const dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
  const dLon = (lon2 - lon1).toRad();
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) *
      Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

if (typeof Number.prototype.toRad === 'undefined') {
  Number.prototype.toRad = function () {
    return (this * Math.PI) / 180;
  };
}
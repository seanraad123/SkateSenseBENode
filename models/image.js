const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  public_url: {
    type: String,
    required: false
  },
  base64: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Image', imageSchema);
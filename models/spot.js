const mongoose = require('mongoose');

const {Schema} = mongoose;

const spotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: true,
  }],
  description: {
    type: String,
    required: true,
  },
  kickout_level: {
    type: Number,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('Spot', spotSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: false
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    }],
    description: {
        type: String,
        required: true
    },
    kickout_level: {
        type: Number,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Bookmark',
        required: true
    }]

  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Spot', spotSchema);
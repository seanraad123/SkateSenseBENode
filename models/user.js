const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'spot',
      },
    ],
    admin:{
      type: Boolean,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);

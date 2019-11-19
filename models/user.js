const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  profilepic: {
    type: String,
    default: 'https://storage.googleapis.com/constry-app/21294.png',
    required: false
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
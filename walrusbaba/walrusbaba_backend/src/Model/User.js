const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true
  },
  OTP: {
    type: Number,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', userSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fortuneSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    default: Date.now
  }
});

module.exports = FortuneMsg = mongoose.model('fortune', fortuneSchema);

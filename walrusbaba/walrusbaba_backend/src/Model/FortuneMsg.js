const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fortuneSchema = new Schema({
  sequence: {
    type: Number,
    require: true
  },

  type: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  Date: {
    type: Date,
    default: Date.now
  }
});

module.exports = FortuneMsg = mongoose.model('fortuneTable', fortuneSchema);

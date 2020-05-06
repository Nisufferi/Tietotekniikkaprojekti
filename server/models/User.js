const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 15
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 24
  },
  phone: {
    type: String,
    required: true,
    min: 10,
    max: 10
  },
  address: {
    type: String,
    required: true,
    min: 15,
    max: 40
  }
});

module.exports = mongoose.model('User', userSchema);

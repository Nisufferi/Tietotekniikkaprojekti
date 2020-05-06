const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 15
  },
  location: {
    name: String,
    xcoord: Number,
    ycoord: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Sensor', sensorSchema);

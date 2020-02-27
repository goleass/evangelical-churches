const mongoose = require('mongoose');

const PointSchema = require('./utils/PointSchema'); 

const ChurchSchema = new mongoose.Schema({
  name: String,
  church_name: String,
  city: {
    type: String,
    required: true
  },
  address: String,
  location: {
    type: PointSchema,
    index: '2dsphere'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
}); 

module.exports = mongoose.model("Church", ChurchSchema);
const mongoose = require('mongoose');

const PointSchema = require('./utils/PointSchema'); 

const ChurchSchema = new mongoose.Schema({
  name: String,
  church_name: String,
  city: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: PointSchema,
    index: '2dsphere'
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
}); 

module.exports = mongoose.model("Church", ChurchSchema);
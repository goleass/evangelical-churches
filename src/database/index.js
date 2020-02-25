const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://godisfaithful:4ETESCev4q7L@cluster0-1dzcg.mongodb.net/churchesradar?retryWrites=true&w=majority';

mongoose.connect(
  MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => console.log('MongoDB is running'));
mongoose.Promise = global.Promise;

module.exports = mongoose;
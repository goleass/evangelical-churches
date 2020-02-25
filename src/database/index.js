const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => console.log('MongoDB is running'));
mongoose.Promise = global.Promise;

module.exports = mongoose;
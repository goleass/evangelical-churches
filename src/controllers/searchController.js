const router = require('express').Router();
const Church = require('../models/Church');

router.get('/', async (req, res) => {
  const { latitude, longitude, name } = req.query;
  const regex = new RegExp(name.toLowerCase().trim(), 'i')

  const churches = await Church.find({
    $or: [
      { church_name: { $regex: regex } },
      { name: { $regex: regex } }],
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: 10000
      }
    },
  }).populate('user');

  return res.send({ churches });
});

module.exports = app => app.use('/search', router);
const router = require('express').Router();
const Church = require('../models/Church');

router.get('/', async (req, res) => {
  const { latitude, longitude, search } = req.query;
  const regex = new RegExp(search.toLowerCase().trim(), 'i')

  const churches = await Church.find({
    $or: [
      { church_name: { $regex: regex } },
      { name: { $regex: regex } },
      { city: { $regex: regex } },
      { address: { $regex: regex } }],
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
const router = require('express').Router();
const Church = require('../models/Church');

router.get('/', async (req, res) => {
  const { latitude, longitude, name } = req.query;

  const churches = await Church.find({
    name: {
      $in: name,
    },
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: 10000
      }
    },
  });

  return res.send({ churches });
});

module.exports = app => app.use('/search', router);
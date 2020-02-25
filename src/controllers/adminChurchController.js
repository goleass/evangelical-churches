const router = require('express').Router();
const Church = require('../models/Church');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/newChurch', async (req, res) => {
  const { name, church_name, latitude, longitude } = req.body;

  const location = {
    type: "Point",
    coordinates: [longitude, latitude]
  }

  const church = await Church.create({
    name,
    user: req.userId,
    church_name,
    location
  })

  return res.send(church);
})

router.put('/:churchId', async (req, res) => {
  const _id = req.params.churchId;
  const { name, church_name } = req.body;

  try {
    const church = await Church.findByIdAndUpdate(_id, {
      name,
      church_name
    }, { new: true }).populate('user');

    return res.send({ church });
  } catch (err) {
    return res.status(400).send({ error: "Error updating church" });
  }
});

router.delete('/:churchId', async (req, res) => {
  const _id = req.params.churchId;

  try {
    const church = await Church.findByIdAndRemove(_id).populate('user');

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: "Error deleting church" });
  }
})

module.exports = app => app.use('/admin', router);
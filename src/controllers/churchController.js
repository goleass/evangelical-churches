const router = require('express').Router();
const Church = require('../models/Church');

router.get('/', async (req, res) => {
  try {
    churches = await Church.find().populate('user');
    return res.send({ churches });
  } catch (err) {
    return res.status(400).send({ error: "Error loading churches" });
  }
});

router.get('/:churchId', async (req, res) => {
  const _id = req.params.churchId;

  try {
    const church = await Church.findById(_id).populate('user');

    return res.send({ church });
  } catch (err) {
    return res.status(400).send({ error: "Error loading church" });
  }
})

module.exports = app => app.use('/churches', router);
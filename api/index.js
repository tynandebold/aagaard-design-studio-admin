const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

router.get('/projects', (req, res) => {
  const collection = req.app.locals.collection;

  collection
    .find({})
    .toArray()
    .then(response => res.status(200).json(response))
    .catch(error => handleError(error));
});

router.get('/project/:id', (req, res) => {
  const collection = req.app.locals.collection;
  const _id = new ObjectId(req.params.id);

  collection
    .findOne({ _id })
    .then(response => res.status(200).json(response))
    .catch(error => handleError(error));
});

router.post('/project', (req, res) => {
  const collection = req.app.locals.collection;

  collection
    .insert(req.body)
    .then(response => res.status(200).json(response))
    .catch(error => handleError(error));
});

function handleError(res, error) {
  console.error(error);
  return res.json({
    ok: false,
    error: JSON.stringify(error)
  });
}

module.exports = router;

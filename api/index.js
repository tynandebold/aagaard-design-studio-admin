const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

router.get('/projects', async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const projects = await collection
      .find({})
      .toArray()
      .then(response => {
        return { projects: response };
      });

    return res.json({
      ok: true,
      ...projects
    });
  } catch (error) {
    return handleError(res, error);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const _id = new ObjectId(req.params.id);

    const project = await collection
      .findOne({ _id })
      .then(response => response);

    return res.json({
      ok: true,
      ...project
    });
  } catch (error) {
    return handleError(res, error);
  }
});

router.post('/project', async (req, res) => {
  try {
    const collection = req.app.locals.collection;

    const project = await collection.insertOne(req.body).then(response => {
      return response.ops[0];
    });

    return res.json({
      ok: true,
      message: project
    });
  } catch (error) {
    return handleError(res, error);
  }
});

router.put('/project/:id', async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const _id = new ObjectId(req.params.id);

    const id = await collection
      .findOneAndUpdate({ _id }, { $set: req.body })
      .then(response => {
        return { id: response.value._id };
      });

    return res.json({
      ok: true,
      ...id
    });
  } catch (error) {
    return handleError(res, error);
  }
});

router.delete('/project/:id', async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const _id = new ObjectId(req.params.id);

    const message = await collection.deleteOne({ _id }).then(response => {
      const deletedCount = response.deletedCount;

      if (deletedCount !== 1) {
        return { message: 'No records found to delete.' };
      }

      return { message: `${deletedCount} record deleted successfully.` };
    });

    return res.send({
      ok: true,
      ...message
    });
  } catch (error) {
    return handleError(res, error);
  }
});

function handleError(res, error) {
  console.error(res, error);
  return res.json({
    ok: false,
    error: JSON.stringify(error)
  });
}

module.exports = router;

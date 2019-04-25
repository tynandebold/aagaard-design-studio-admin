const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const dbUrl = `mongodb+srv://the-creator-1:${
  process.env.MONGODB_PASSWORD
}@cluster0-n5sxe.mongodb.net/test?retryWrites=true`;
const dbName = process.env.DB_NAME;

const api = require('./api/');

app.prepare().then(() => {
  const server = express();

  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());

  server.get('/_health', (req, res) => {
    res.json({
      ok: true,
      message: 'healthy'
    });
  });

  server.use('/api', api);

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  MongoClient.connect(dbUrl, { useNewUrlParser: true })
    .then(client => {
      const db = client.db(dbName);
      const collection = db.collection('projects');
      console.log(`> Connected to ${dbName}!`);

      server.locals.collection = collection;
      server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
    })
    .catch(error => console.error(error));
});

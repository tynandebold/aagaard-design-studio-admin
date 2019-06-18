const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const port = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const dbConnect = require('./db/');
const api = require('./api/');
const auth = require('./auth/');

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

  server.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET
    })
  );

  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(passport.initialize());
  server.use(passport.session());

  require('./auth/strategy.js')(passport);

  server.get('/_health', (req, res) => {
    res.json({
      ok: true,
      message: 'healthy'
    });
  });

  server.use('/auth', auth);
  server.use('/api', api);

  server.get('*', (req, res) => {
    // console.log(req.user);

    // if (!req.user) {
    //   res.redirect('/login');
    //   return;
    // }

    return handle(req, res);
  });

  dbConnect.then(collection => {
    /**
     * Attach the collection from the DB to the server/req obj, which can
     * then be retrieved via `req.app.locals.collection`
     */
    server.locals.collection = collection;

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
});

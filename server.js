const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const flash = require('connect-flash');

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
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({
        url: `mongodb+srv://the-creator-1:${
          process.env.MONGODB_PASSWORD
        }@cluster0-n5sxe.mongodb.net/test?retryWrites=true`
      })
    })
  );

  server.use(flash());
  server.use(compression());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(passport.initialize());
  server.use(passport.session());

  auth(passport);

  server.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  server.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/error',
      failureFlash: true
    })
  );

  server.get('/_health', (req, res) => {
    res.json({
      ok: true,
      message: 'healthy'
    });
  });

  server.use('/api', api);

  server.get('/error', (req, res) => {
    const error =
      req.flash('error')[0] ||
      "You don't have the appropriate permissions to access this application.";

    res.send(error);
  });

  server.get('*', isLoggedIn, (req, res) => {
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

function isLoggedIn(req, res, next) {
  if (/_next/g.test(req.path)) {
    return next();
  }

  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/google');
  }
}

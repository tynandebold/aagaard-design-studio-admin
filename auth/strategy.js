const User = require('./user');
const LocalStrategy = require('passport-local').Strategy;

const auth = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new LocalStrategy(function(username, password, done) {
      User.findByUsername({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.validPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
};

module.exports = auth;

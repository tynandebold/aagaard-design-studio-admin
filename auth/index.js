const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function auth(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_AUTH_CLIENTID,
        clientSecret: process.env.GOOGLE_AUTH_CLIENTSECRET,
        callbackURL: process.env.GOOGLE_AUTH_CALLBACKURL
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
          const email = profile.emails[0].value;

          // not an authorized google account
          if (email !== process.env.USER_1 && email !== process.env.USER_2) {
            return done(null, false, {
              message:
                "You don't have the appropriate permissions to access this application."
            });
          }

          return done(null, profile);
        });
      }
    )
  );
}

module.exports = auth;

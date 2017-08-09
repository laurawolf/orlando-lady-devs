const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');

passport.use(
  new GoogleStrategy({
    clientID: global.secret.CLIENT_ID,
    clientSecret: global.secret.CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile.emails[0].value);
    const searchQuery = {
      googleID: profile.id
    };

    const updates = {
      email: profile.emails[0].value,
      name: profile.displayName,
      accessToken,
      googleID: profile.id
    };

    const options = {
      upsert: true,
      new: true
    };

    User.findOneAndUpdate(
      searchQuery,
      { $set: updates },
      options,
      (err, user) => {
        if (err) {
          return cb(err);
        }
        return cb(null, user);
      }
    );
  })
);

module.exports = passport;

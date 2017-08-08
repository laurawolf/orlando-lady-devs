const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const User = require('../models/user');
const mongoose = require('mongoose');

mongoose.promise = global.promise;

passport.use(
  new BearerStrategy(
    (token, done) => {
      User.findOne({ accessToken: token })
          .then(user => done(null, user))
          .catch(() => done(null, false));
    }
  )
);

module.exports = passport;

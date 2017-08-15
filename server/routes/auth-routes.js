const express = require('express');
const mongoose = require('mongoose');
const bearer = require('../auth/bearer');
const passport = require('../auth/google');
const sendMail = require('../utils/mailer');

const router = express.Router();

mongoose.Promise = global.Promise;

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {
    // send welcom email for new signup
    const subject = 'Welcome to Lady Devs';
    sendMail(req.user.email, subject)
      // send email to person who just signed up
      .then(() => sendMail(global.secret.ADMIN_EMAIL_ADDRESS, `New User: ${req.user.email}`))
      .then(info => console.log(info))
      .catch(error => console.log(error));
    res.cookie('accessToken', req.user.accessToken, { expires: 0 });
    res.redirect('/');
  }
);

router.get('/me', passport.authenticate('bearer', { session: false }), (req, res) =>
  res.json(req.user)
);

router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('accessToken');
  res.redirect('/');
});

module.exports = router;

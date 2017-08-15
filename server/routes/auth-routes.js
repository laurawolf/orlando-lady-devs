const express = require('express');
const mongoose = require('mongoose');
const bearer = require('../auth/bearer');
const passport = require('../auth/google');
const smtpTransport = require('../utils/mailer');

const router = express.Router();

mongoose.Promise = global.Promise;

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {
    console.log('google callback', req.user);
    const mailOptions = {
      from: 'Lady Devs <dev.forms.node@gmail.com>',
      to: req.user.email,
      subject: 'Welcome to Lady Devs',
      text: 'We have received your organizer request and approve it pronto',
      html: '<b>Lady Devs Rule!!<b>'
    };
    smtpTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.cookie('accessToken', req.user.accessToken, { expires: 0 });
    res.redirect('/');
  }
);

router.get('/me',
    passport.authenticate('bearer', { session: false }),
    (req, res) => res.json(req.user)
);

router.get('/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

module.exports = router;

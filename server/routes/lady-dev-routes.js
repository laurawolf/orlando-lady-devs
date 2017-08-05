const express = require('express');
const mongoose = require('mongoose');
const passportGoogle = require('../auth/google');
const LadyDev = require('../models/lady-dev');

mongoose.Promise = global.Promise;

const router = express.Router();

router.get(
  '/',
  passportGoogle.authenticate('bearer', { session: false }),
  (req, res) => {
    LadyDev
    .find()
    .exec()
    .then(ladies => {
      res.json(ladies);
    })
    .catch(() => {
      res.status(500).json({ error: 'something went wrong' });
    });
});

router.post('/', (req, res) => {
  LadyDev
  .create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    currentExpertise: req.body.currentExpertise,
    currentlyLearning: req.body.currentlyLearning,
    interestedInLearning: req.body.interestedInLearning,
    currentCompany: req.body.currentCompany,
    currentPosition: req.body.currentPosition,
    meetupSuggestions: req.body.meetupSuggestions
  })
  .then(lady => {
    res.status(201).json(lady);
  })
  .catch(() => {
    res.status(500).json({ error: 'something went wrong' });
  });
});

module.exports = router;

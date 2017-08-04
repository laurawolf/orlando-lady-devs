const mongoose = require('mongoose');

const LadydevSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  currentExpertise: { type: String, required: true },
  currentlyLearning: { type: String, required: true },
  interestedInLearning: { type: String, required: true },
  currentCompany: { type: String, required: true },
  currentPosition: { type: String, required: true },
  meetupSuggestions: { type: String, required: true },
});

const LadyDev = mongoose.model('LadyDev', LadydevSchema);

module.exports = { LadyDev };

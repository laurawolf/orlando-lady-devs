const mongoose = require('mongoose');

const ladydevSchema = mongoose.Schema({
  firstName: { type: String, requered: true },
  lastName: { type: String, requered: true },
  knowledge: { type: String, requered: true },
  learning: { type: String, required: true },
  futureLearning: { type: String, required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  suggestions: { type: String, required: true },
})

const ladyDev = mongoose.model('ladyDev', ladydevSchema);

module.exports = { ladyDev };

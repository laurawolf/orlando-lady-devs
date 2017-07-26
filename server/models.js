const mongoose = require('mongoose');

const ladydevSchema = mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  },

  knowledge: { type: String, requered: true },
  learning: { type: String, required: true },
  futureLearning: { type: String, required: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  suggestions: { type: String, required: true },
  //image: {}
})

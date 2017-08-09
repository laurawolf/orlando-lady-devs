const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  googleID: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  accessToken: { type: String, required: true },
  approved: { type: Boolean, required: true, default: false }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

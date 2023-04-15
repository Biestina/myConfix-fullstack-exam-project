const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  // username: String,
  email: String,
  password: String,
  role: String,
  configs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Config'
  }]
}, { timestamps: true }, {versionKey: false});

module.exports = mongoose.model('User', UserSchema);
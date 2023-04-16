const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

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

UserSchema.plugin(idValidator);
module.exports = mongoose.model('User', UserSchema);
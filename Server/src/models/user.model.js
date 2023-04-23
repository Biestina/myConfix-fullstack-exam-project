const mongoose = require('mongoose');
// const idValidator = require('mongoose-id-validator');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: String,
  configs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Config'
  }]
}, { timestamps: true }, {versionKey: false});

// UserSchema.plugin(idValidator);
module.exports = mongoose.model('User', UserSchema);
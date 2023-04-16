const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const ConfigSchema = mongoose.Schema({
  case: String,
  cpu: String,
  gpu: String,
  motherboard: String,
  monitor: String,
  psu: String,
  ram: String,
  storage: String,
  related_user: {
    // required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true }, {versionKey: false});

ConfigSchema.plugin(idValidator);
module.exports = mongoose.model('Config', ConfigSchema);
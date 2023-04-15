const mongoose = require('mongoose');

const ConfigSchema = mongoose.Schema({
  case: String,
  cpu: String,
  gpu: String,
  motherboard: String,
  monitor: String,
  psu: String,
  ram: String,
  storage: String
}, { timestamps: true }, {versionKey: false});

module.exports = mongoose.model('Config', ConfigSchema);
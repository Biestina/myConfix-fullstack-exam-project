const mongoose = require('mongoose');

const ConfigSchema = new mongoose.Schema({
  case: String,
  cpu: String,
  gpu: String,
  motherboard: String,
  monitor: String,
  psu: String,
  ram: String,
  storage: String,
  related_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true }, {versionKey: false});

module.exports = mongoose.model('Config', ConfigSchema);
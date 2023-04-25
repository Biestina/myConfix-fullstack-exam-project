const Hardware = require('../../models/hardware.model');

exports.findAll = () => Hardware.find();
exports.findById = id => Hardware.findById(id);
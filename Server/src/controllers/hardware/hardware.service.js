const Hardware = require('../../models/hardware.model');

exports.create = hardware => {
  const newHardware = new Hardware(hardware);
  return newHardware.save();
};

exports.findAll = () => Hardware.find();

exports.findById = id => Hardware.findById(id);

exports.update = (id, hardwareData) => Hardware.findByIdAndUpdate(id, hardwareData, { new: true });

exports.delete = id => Hardware.findByIdAndRemove(id);
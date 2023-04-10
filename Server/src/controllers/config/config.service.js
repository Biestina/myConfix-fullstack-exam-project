const Config = require('../../models/config.model');

exports.create = config => {
  const newConfig = new Config(config);
  return newConfig.save();
};

exports.findAll = () => Config.find();

exports.findById = id => Config.findById(id);

exports.update = (id, configData) => Config.findByIdAndUpdate(id, configData, { new: true });

exports.delete = id => Config.findByIdAndRemove(id);
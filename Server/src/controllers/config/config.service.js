const Config = require('../../models/config.model');
const User = require('../../models/user.model');

exports.create = async (configData, userId) => {
  const user = await User.findById(userId);
  const newConfig = new Config(configData);
  newConfig.related_user = user;
  user.configs.push(newConfig);
  await newConfig.save();
  await user.save();
  return newConfig;
};

exports.findAll = userId => Config.find({ related_user: userId });

exports.findById = configId => Config.findById(configId);

exports.update = async (id, configData) => {
  const config = await Config.findByIdAndUpdate(id, configData, { new: true });
  const user = await User.findById(config.related_user);
  if (!user.configs.includes(config._id)) {
    user.configs.push(config._id);
    await user.save();
  }
  return config;
};

exports.delete = async (id) => {
  const config = await Config.findByIdAndRemove(id);
  const user = await User.findById(config.related_user);
  user.configs.pull({ _id: config._id });
  await user.save();
  return config;
};
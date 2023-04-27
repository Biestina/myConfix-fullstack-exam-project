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
  console.log(user.configs)
  const configs = user.configs.map(config => config._id.toString());
  if (configs.includes(config._id.toString())) {
    user.configs.splice(configs.indexOf(config._id.toString()), 1, config._id);
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
const Config = require('../../models/config.model');
const User = require('../../models/user.model');

// exports.create = config => {
//   const newConfig = new Config(config);
//   const updatedUser = User.findById(config.related_user, { $push: { configs: newConfig._id } }, { new: true });
//   return newConfig.save() && updatedUser.save();
// };
exports.createConfigByUserId = async (configData, userId) => {
  const user = await User.findById(userId);
  const newConfig = new Config(configData);
  newConfig.related_user = user;
  user.configs.push(newConfig);
  await newConfig.save();
  await user.save();
  return newConfig;
};


// exports.findAll = () => Config.find({}, {}).populate('related_user', { email: 1 });
// exports.findAll = () => Config.find().populate();
exports.findAllByUserId = userId => Config.find({ related_user: userId });

exports.findById = id => Config.findById(id);

// exports.update = (id, configData) => Config.findByIdAndUpdate(id, configData, { new: true });
exports.update = async (id, configData) => {
    const config = await Config.findByIdAndUpdate(id, configData, { new: true });
    await User.updateOne(
      { _id: config.related_user },
      { $set: { "configs.$[configToModify]": config } },
      { arrayFilters: [{ "configToModify._id": config._id }] }
    );
    return config;
}

// exports.delete = id => Config.findByIdAndRemove(id);
exports.delete = async (id) => {
    const config = await Config.findByIdAndRemove(id);
    await User.updateOne(
      { _id: config.related_user },
      { $pull: { configs: { _id: config._id } } }
    );
}
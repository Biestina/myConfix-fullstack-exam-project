const Config = require('../../models/config.model');
const User = require('../../models/user.model');

exports.create = config => {
  const newConfig = new Config(config);
  console.log(newConfig);
  return newConfig.save()
  .then(() => User.findById(config.related_user))
    .then((user) => {
      user.configs.push(newConfig._id);
      return user.save()
        .then(() => newConfig);
    });
};

exports.findAll = () => Config.find({}, {}).populate('related_user', { email: 1 });

exports.findById = id => Config.findById(id);

exports.update = (id, configData) => Config.findByIdAndUpdate(id, configData, { new: true });

exports.delete = id => Config.findByIdAndRemove(id);
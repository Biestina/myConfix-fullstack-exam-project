const User = require('../../models/user.model');

exports.create = user => {
  const newUser = new User(user);
  console.log(newUser);
  return newUser.save()
};

exports.findAll = () => User.find();

exports.findById = id => User.findById(id);
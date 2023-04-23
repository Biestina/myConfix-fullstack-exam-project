const logger = require('../../config/logger');
const createError = require('http-errors');
const User = require('../../models/user.model');
const userService = require('./user.service');

//* create / register
exports.create = async (req, res, next) => {

  //* MONGO Validation
  const validationErrors = new User(req.body).validateSync();
  if(validationErrors) {
    return next(new createError.BadRequest(validationErrors))
  }

  const newUser = {
    email: req.body['email'],
    password: req.body['password'],
    role: 'USER',
    configs: []
  };

  try {
    const savedUser = await userService.create(newUser);
    logger.info(`New user registered`);
    res.status(201).json(savedUser);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('User registration failed'));
  };
};


//* findAll
exports.findAll = async (req, res, next) => {
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}`);
  try {
    const userList = await userService.findAll();
    res.json(userList);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error (cannot find users)'));
  };
};


//* findById
exports.findById = async (req, res, next) => {
  const userId = req.params.id;
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}` + ` Get one user with id: ${userId}`);

  try {
    const user = await userService.findById(userId);
    logger.info(user);
    if (!user) return next(new createError.NotFound(`User with id ${userId} not found!`))
    res.json(user);
  } catch (error) {
    logger.error(error);
    if (error.kind === "ObjectId") {
      return next(new createError.BadRequest(`Invalid ObjectID: ${userId}`));
    } else {
      logger.error(Object.entries(error))
      return next(new createError.InternalServerError('Database error (cannot find one user)'))

    }
  };
};
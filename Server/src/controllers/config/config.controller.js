const logger = require('../../config/logger');
const createError = require('http-errors');
const Config = require('../../models/config.model');
const configService = require('./config.service');
const userService = require('../user/user.service');

//* create
// exports.create = async (req, res, next) => {

//   //* MONGO Validation
//   const validationErrors = new Config(req.body).validateSync();
//   if(validationErrors) {
//     return next(new createError.BadRequest(validationErrors))
//   }

//   const newConfig = {
//     case: req.body['case'],
//     cpu: req.body['cpu'],
//     gpu: req.body['gpu'],
//     motherboard: req.body['motherboard'],
//     monitor: req.body['monitor'],
//     psu: req.body['psu'],
//     ram: req.body['ram'],
//     storage: req.body['storage'],
//     related_user: req.user.id
//   };

//   try {
//     const savedConfig = await configService.create(newConfig);
//     logger.info(`New configuration saved`);
//     res.status(201).json(savedConfig);
//   } catch (error) {
//     logger.error(error);
//     return next(new createError.InternalServerError('Configuration could not be saved'));
//   };
// };

//* createConfigByUserId
exports.createConfigByUserId = async (req, res, next) => {

  const userId = req.user._id;
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}` + ` Create config with user id: ${userId}`);

  //* MONGO Validation
  const validationErrors = new Config(req.body).validateSync();
  if(validationErrors) {
    return next(new createError.BadRequest(validationErrors))
  }

  const newConfig = {
    case: req.body['case'],
    cpu: req.body['cpu'],
    gpu: req.body['gpu'],
    motherboard: req.body['motherboard'],
    monitor: req.body['monitor'],
    psu: req.body['psu'],
    ram: req.body['ram'],
    storage: req.body['storage'],
    // related_user: userId
  };

  try {
    const savedConfig = await configService.createConfigByUserId(newConfig, userId);
    logger.info(`New configuration saved`);
    const updatedUser = await userService.updateUserConfigs(userId, savedConfig);
    // res.status(201).json(savedConfig);
    // res.status(201).json({ savedConfig, user: updatedUser });  // TypeError: Converting circular structure to JSON
    res.status(201).json(savedConfig);
    res.status(201).json(JSON.parse(savedConfig)); // SyntaxError: Unexpected token c in JSON at position 4
    //* mindkét esetben elmenti amúgy........ x_x"
  } catch (error) {
    console.log(error);
    logger.error(error);
    return next(new createError.InternalServerError('Configuration could not be saved to user'));
  };
};


//* findAll
// exports.findAll = async (req, res, next) => {
//   logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}`);
//   try {
//     const configList = await configService.findAllByUserId(req.user.id);
//     res.json(configList);
//     console.log(userId);
//     console.log('findall');
//   } catch (error) {
//     logger.error(error);
//     return next(new createError.InternalServerError('Database error (cannot find configs)'));
//   };
// };

//* findAllByUserId
exports.findAllByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  console.log('req: ', req.params);
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}` + ` Get all configs with user id: ${userId}`);
  
  try {
    const configList = await configService.findAllByUserId(userId);
    res.json(configList);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error (cannot find configs)'));
  };
};


//* findById
exports.findById = async (req, res, next) => {
  const configId = req.params.id;
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}` + ` Get one config with id: ${configId}`);

  try {
    const config = await configService.findById(configId);
    logger.info(config);
    // config ? config : {};
    if (!config) return next(new createError.NotFound(`Config with id ${configId} not found!`))
    res.json(config);
  } catch (error) {
    logger.error(error);
    if (error.kind === "ObjectId") {
      return next(new createError.BadRequest(`Invalid ObjectID: ${configId}`));
    } else {
      logger.error(Object.entries(error))
      return next(new createError.InternalServerError('Database error (cannot find one config)'))

    }
  };
};


//* update
// exports.update = async (req, res, next) => {
//   logger.debug(`A new ${req.method} request has been sent at ${new Date().toUTCString()}, path: ${req.url}`);
//   const configId = req.params.id;
//   const newData = req.body;

//   try {
//     const config = await configService.update(configId, newData);
//     res.json(config);
//   } catch (error) {
//     logger.error(error);
//     return next(new createError.InternalServerError('Could not update'));
//   };
// };
exports.update = async (req, res, next) => {
  logger.debug(`A new ${req.method} request has been sent at ${new Date().toUTCString()}, path: ${req.url}`);
  const configId = req.params.id;
  const newData = req.body;

  try {
    const config = await configService.update(configId, newData);
    res.json(config);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Could not update'));
  };
};


//* delete
exports.delete = async (req, res, next) => {
  const configId = req.params.id;
  try {
    await configService.delete(configId);
    res.send(`Deleted config with id ${configId}`);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error (cannot delete config)'));
  };
};
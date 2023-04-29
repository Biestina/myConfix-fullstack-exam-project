const logger = require('../../config/logger');
const createError = require('http-errors');
const Config = require('../../models/config.model');
const configService = require('./config.service');
const userService = require('../user/user.service');
const util = require('util');

exports.create = async (req, res, next) => {

  const userId = req.params.userId;
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}` + ` Create config with user id: ${userId}`);

  const validationErrors = new Config(req.body).validateSync();
  if (validationErrors) {
    return next(new createError.BadRequest(validationErrors))
  };

  const newConfig = {
    case: req.body['case'],
    cpu: req.body['cpu'],
    gpu: req.body['gpu'],
    motherboard: req.body['motherboard'],
    monitor: req.body['monitor'],
    psu: req.body['psu'],
    ram: req.body['ram'],
    storage: req.body['storage'],
  };

  try {
    const savedConfig = await configService.create(newConfig, userId);
    logger.info(`New configuration saved`);
    res.status(201).send(util.inspect(savedConfig));
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Configuration could not be saved to the user'));
  };
};

exports.findAll = async (req, res, next) => {
  const userId = req.params.userId;
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}` + ` Get all configs with user id: ${userId}`);

  try {
    const configList = await configService.findAll(userId);
    res.json(configList);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error (cannot find configs)'));
  };
};


exports.findById = async (req, res, next) => {
  const configId = req.params.configId;
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}` + ` Get one config with id: ${configId}`);

  try {
    const config = await configService.findById(configId);
    logger.info(config);
    res.json(config);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error (cannot find one config)'))

  }
};

exports.update = async (req, res, next) => {
  logger.debug(`A new ${req.method} request has been sent at ${new Date().toUTCString()}, path: ${req.url}`);
  const configId = req.params.configId;
  const newData = req.body;

  try {
    const config = await configService.update(configId, newData);
    res.json(config);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error (could not update the config)'));
  };
};

exports.delete = async (req, res, next) => {
  const configId = req.params.configId;
  try {
    await configService.delete(configId);
    res.json({});
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error (cannot delete config)'));
  };
};
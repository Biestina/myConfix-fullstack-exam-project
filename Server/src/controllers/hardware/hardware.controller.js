const logger = require('../../config/logger');
const createError = require('http-errors');
const Hardware = require('../../models/hardware.model');
const hardwareService = require('./hardware.service');


exports.findAll = async (req, res, next) => {
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}`);
  try {
    const hardwareList = await hardwareService.findAll();
    res.json(hardwareList);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error (cannot find hardwares)'));
  };
};


exports.findById = async (req, res, next) => {
  const hardwareId = req.params.id;
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}` + ` Get one hardware with id: ${hardwareId}`);
  try {
    const hardware = await hardwareService.findById(hardwareId);
    res.json(hardware);
  } catch (error) {
    logger.error(error);
    return next(new createError.NotFound(`Hardware with id ${hardwareId} not found!`));
  }
};

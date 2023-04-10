const logger = require('../../config/logger');
const createError = require('http-errors');
const Hardware = require('../../models/hardware.model');
const hardwareService = require('./hardware.service');

//TODO create + update validators (modelvalidator)

//* create
exports.create = async (req, res, next) => {

  //* MONGO Validation
  const validationErrors = new Hardware(req.body).validateSync();
  if(validationErrors) {
    return next(new createError.BadRequest(validationErrors))
  }
  const newHardware = req.body;

  try {
    const savedHardware = await hardwareService.create(newHardware);
    logger.info(`${newHardware.name} has been saved!`);
    res.status(201).json(savedHardware);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Hardware could not be saved'));
  };
};


//* findAll
exports.findAll = async (req, res, next) => {
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}`);
  try {
    const hardwareList = await hardwareService.findAll();
    res.json(hardwareList);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error (find hardwares)'));
  };
};


//* findById
exports.findById = async (req, res, next) => {
  const hardwareId = req.params.id;
  logger.debug(`${new Date().toUTCString()}, METHOD: ${req.method}, path: ${req.originalUrl}` + ` Get one hardware with id: ${hardwareId}`);

  try {
    const hardware = await hardwareService.findById(hardwareId);
    logger.info(hardware);
    // hardware ? hardware : {};
    if (!hardware) return next(new createError.NotFound(`Hardware with id ${hardwareId} not found!`))
    res.json(hardware);
  } catch (error) {
    logger.error(error);
    if (error.kind === "ObjectId") {
      return next(new createError.BadRequest(`Invalid ObjectID: ${hardwareId}`));
    } else {
      logger.error(Object.entries(error))
      return next(new createError.InternalServerError('Database error (find one hardware)'))

    }
  };
};


// //* update
exports.update = async (req, res, next) => {
  logger.info(`A new ${req.method} request has been sent at ${new Date().toUTCString()}, path: ${req.url}`);
  const hardwareId = req.params.id;
  const newData = req.body;

  try {
    const hardware = await hardwareService.update(hardwareId, newData);
    res.json(hardware);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Could not update'));
  };
};


// //* delete
exports.delete = async (req, res, next) => {
  const hardwareId = req.params.id;
  try {
    await hardwareService.delete(hardwareId);
    res.send(`Deleted hardware with id ${hardwareId}`);
  } catch (error) {
    logger.error(error);
    return next(new createError.InternalServerError('Database error (delete hardware)'));
  };
};
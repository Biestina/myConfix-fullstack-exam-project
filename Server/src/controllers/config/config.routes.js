const express = require('express');
const router = express.Router();

const configController = require('./config.controller');

router.post('/', (req, res, next) => {
  return configController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  return configController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  return configController.findById(req, res, next);
});

router.put('/:id', (req, res, next) => {
  return configController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  return configController.delete(req, res, next);
});

module.exports = router;
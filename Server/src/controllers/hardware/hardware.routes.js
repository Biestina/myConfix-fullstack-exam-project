const express = require('express');
const router = express.Router();

const hardwareController = require('./hardware.controller');

router.post('/', (req, res, next) => {
  return hardwareController.create(req, res, next);
});

router.get('/', (req, res, next) => {
  return hardwareController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  return hardwareController.findById(req, res, next);
});

router.put('/:id', (req, res, next) => {
  return hardwareController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  return hardwareController.delete(req, res, next);
});

module.exports = router;
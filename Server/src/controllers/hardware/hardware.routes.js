const express = require('express');
const router = express.Router();
const hardwareController = require('./hardware.controller');

router.get('/', (req, res, next) => {
  return hardwareController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
  return hardwareController.findById(req, res, next);
});

module.exports = router;
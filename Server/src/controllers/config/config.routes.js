const express = require('express');
const router = express.Router();
const configController = require('./config.controller');

// router.get('/user/:id', (req, res, next) => {
router.get('/:userId/myconfigs', (req, res, next) => {
  return configController.findAllByUserId(req, res, next);
});

// router.post('/user', (req, res, next) => {
router.post('/:userId/myconfigs', (req, res, next) => {
  return configController.createConfigByUserId(req, res, next);
});


// router.post('/', (req, res, next) => {
//   return configController.create(req, res, next);
// });

// router.get('/', (req, res, next) => {
//   return configController.findAll(req, res, next);
// });

router.get('/:id', (req, res, next) => {
  return configController.findById(req, res, next);
});

// router.put('/:id', (req, res, next) => {
router.put('/:userId/myconfigs/:configId', (req, res, next) => {
  return configController.update(req, res, next);
});

// router.delete('/:id', (req, res, next) => {
router.delete('/:userId/myconfigs/:configId', (req, res, next) => {
  return configController.delete(req, res, next);
});

module.exports = router;
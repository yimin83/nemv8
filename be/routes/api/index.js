var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.use('/rooms', require('./rooms'))
router.use('/emsSysConfig', require('./rooms'))
router.use('/damperConfig', require('./rooms'))
router.use('/getRoomConfig', require('./rooms'))
router.use('/ahusConfig', require('./rooms'))
router.use('/zones', require('./rooms'))
router.use('/cmdManualHeating', require('./rooms'))
router.use('/cmdRoomState', require('./rooms'))




router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없음'));
});

module.exports = router;

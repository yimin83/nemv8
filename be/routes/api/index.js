var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.use('/rooms', require('./rooms'))

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없음'));
});

module.exports = router;

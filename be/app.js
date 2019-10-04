var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var socket = require('./socket');

const history = require('connect-history-api-fallback')
const cors = require('cors')

//var socket = require('./routers/api/socket')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// app.use(cors())
if (process.env.NODE_ENV !== 'production') app.use(cors())
app.use('/api', require('./routes/api'));
app.use(history());
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));

// socket.server;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  next(err);
});
module.exports = app;

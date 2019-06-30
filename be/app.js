var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const history = require('connect-history-api-fallback')
const cors = require('cors')

//var socket = require('./routers/api/socket')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(cors())
app.use('/api', require('./routes/api'));
app.use(history());
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));

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
var net_server = require('net');

var server = net_server.createServer(function(client) {

    console.log('Client connection: ');
    console.log('   local = %s:%s', client.localAddress, client.localPort);
    console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);

    client.setTimeout(500);
    client.setEncoding('utf8');

    client.on('data', function(data) {
        console.log('Received data from client on port %d: %s', client.remotePort, data.toString());

        writeData(client, 'Sending: ' + data.toString());
        console.log('  Bytes sent: ' + client.bytesWritten);
    });

    client.on('end', function() {
        console.log('Client disconnected');
    });

    client.on('error', function(err) {
        console.log('Socket Error: ', JSON.stringify(err));
    });

    client.on('timeout', function() {
        console.log('Socket Timed out');
    });
});

server.listen(9090, function() {
    console.log('Server listening: ' + JSON.stringify(server.address()));
    server.on('close', function(){
        console.log('Server Terminated');
    });
    server.on('error', function(err){
        console.log('Server Error: ', JSON.stringify(err));
    });
});

function writeData(socket, data){
  var success = socket.write(data);
  if (!success){
    console.log("Client Send Fail");
  }
}
module.exports = app;

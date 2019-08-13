var net_server = require('net');
var net = require('./../routes/api/socketOutput');
var server = net_server.createServer(function(client) {
    console.log('server - Client connection: ');
    console.log('server -    local = %s:%s', client.localAddress, client.localPort);
    console.log('server -    remote = %s:%s', client.remoteAddress, client.remotePort);
    client.setTimeout(500);
    client.setEncoding('utf8');
    client.on('data', function(data) {
        console.log('server - Received data from client on port %d: %s', client.remotePort, data.toString());
        net.writeData(client, 'Sending: ' + data.toString());
        console.log('server -   Bytes sent: ' + client.bytesWritten);
    });
    client.on('end', function() {
        console.log('server - Client disconnected');
    });
    client.on('error', function(err) {
        console.log('server - Socket Error: ', JSON.stringify(err));
    });
    client.on('timeout', function() {
        console.log('server - Socket Timed out');
    });
});
server.listen(10000, function() {
    console.log('server - Server listening: ' + JSON.stringify(server.address()));
    server.on('close', function(){
        console.log('server - Server Terminated');
    });
    server.on('error', function(err){
        console.log('server - Server Error: ', JSON.stringify(err));
    });
});
module.exports = server;

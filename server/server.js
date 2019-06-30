var net = require('net');
var server = net.createServer(function(socket){
  console.log(socket.address().address + " connected.");
  socket.on('data', function(data){
    console.log('rcv : ' + data)
  })
  socket.on('close', function(){
    console.log('client disconnected!')
  })
  socket.write('connected!!')
})

server.on('error', function(err){
  console.log('err', err);
})
server.listen(8000, function() {
  console.log('listening on 8000...');
})

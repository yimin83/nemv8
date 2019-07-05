
var net_client = require('net');
var struct = require("cpp-struct-js");
var net = {};
net.getConnection = function (){
    //서버에 해당 포트로 접속
    var client = "";
    var recvData = [];
    var local_port = "";

    client = net_client.connect({port: 10004, host:'localhost'}, function() {

        console.log("connect log======================================================================");
        console.log('connect success');
        this.localPort = 10000;
        console.log('local = ' + this.localAddress + ':' + this.localPort);
        console.log('remote = ' + this.remoteAddress + ':' +this.remotePort);

        local_port = this.localPort;

        this.setEncoding('utf8');
        this.setTimeout(600000); // timeout : 10분
        console.log("client setting Encoding:binary, timeout:600000" );
        console.log("client connect localport : " + local_port);
    });

    // 접속 종료 시 처리
    client.on('close', function() {
        console.log("client Socket Closed : " + " localport : " + local_port);
    });

// 데이터 수신 후 처리
    client.on('data', function(data) {
        console.log("data recv log======================================================================");
        recvData.push(data);
        console.log("data.length : " + data.length);
        console.log("data recv : " + data);
        client.end();
    });

    client.on('end', function() {
        console.log('client Socket End');
    });

    client.on('error', function(err) {
        console.log('client Socket Error: '+ JSON.stringify(err));
    });

    client.on('timeout', function() {
        console.log('client Socket timeout: ');
    });

    client.on('drain', function() {
        console.log('client Socket drain: ');
    });

    client.on('lookup', function() {
        console.log('client Socket lookup: ');
    });
    return client;
}

net.writeData = function (socket, data){
  var success = !socket.write(data);
  if (!success){
      console.log("Server Send Fail");
  }
}

var MenualHeatingMsg = new struct("menualHeatingMsg", [
    "RoomNo", struct.uint16(),
    "HeatingMode", struct.uint8(),
    "SetTemp", struct.uint32(),
    "SetControlRange", struct.uint32(),
    "HeatingTimeSec", struct.int8()
]);

var RoomState = new struct("RoomState", [
    "RoomNo", struct.uint16(),
    "RoomState", struct.uint8()
]);

var RoomConfig = new struct("RoomState", [
    "RoomNo", struct.uint16(),
    "SetTemp", struct.uint32(),
    "ControlRange", struct.uint32(),
    "CheckInOutEnbale", struct.char(1),
    "CheckInTime", struct.uint32(),
    "CheckOutTime", struct.uint32()
]);

net.makeSendMenualHeatingMsg = function (roomNo, heatingMode, setTemp, setControlRange, heatingTimeSec){
  var buffer = new Buffer(MenualHeatingMsg.size());
  MenualHeatingMsg.encode(buffer,0, {
    RoomNo: roomNo,
    HeatingMode: heatingMode,
    SetTemp: setTemp,
    SetControlRange: setControlRange,
    HeatingTimeSec: heatingTimeSec
  },{endian:"LE"})
  return buffer;
}


net.makeSetRoomState = function (roomNo, roomStat){
  var buffer = new Buffer(RoomState.size());
  RoomState.encode(buffer,0, {
    RoomNo: roomNo,
    RoomState: roomStat
  },{endian:"LE"})
  return buffer;
}

net.makeSetRoomConfig = function (roomNo, setTemp, controlRange, checkInOutEnbale, checkInTime, checkOutTime){
  var buffer = new Buffer(RoomConfig.size());
  RoomConfig.encode(buffer,0, {
    RoomNo: roomNo,
    SetTemp: setTemp,
    ControlRange: controlRange,
    CheckInOutEnbale: checkInOutEnbale,
    CheckInTime: checkInTime,
    CheckOutTime: checkOutTime
  },{endian:"LE"})
  return buffer;
}

module.exports = net;

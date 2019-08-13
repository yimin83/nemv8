
var net_client = require('net');
var struct = require("cpp-struct-js");
var net = {};
net.getConnection = function (){
    //서버에 해당 포트로 접속
    var client = "";
    var recvData = [];
    var local_port = "";

    client = net_client.connect({port: 10004, host:'localhost'}, function() {

        console.log("socketOutput connect log======================================================================");
        console.log('socketOutput connect success');
        this.localPort = 10000;
        console.log('socketOutput local = ' + this.localAddress + ':' + this.localPort);
        console.log('socketOutput remote = ' + this.remoteAddress + ':' +this.remotePort);

        local_port = this.localPort;

        this.setEncoding('utf8');
        this.setTimeout(600000); // timeout : 10분
        console.log("socketOutput client setting Encoding:binary, timeout:600000" );
        console.log("socketOutput client connect localport : " + local_port);
    });

    // 접속 종료 시 처리
    client.on('close', function() {
        console.log("socketOutput client Socket Closed : " + " localport : " + local_port);
    });

// 데이터 수신 후 처리
    client.on('data', function(data) {
        console.log("socketOutput data recv log======================================================================");
        recvData.push(data);
        console.log("socketOutput data.length : " + data.length);
        console.log("socketOutput data recv : " + data);
        //client.end();
    });

    client.on('end', function() {
        console.log('socketOutput client Socket End');
    });

    client.on('error', function(err) {
        console.log('socketOutput client Socket Error: '+ JSON.stringify(err));
    });

    client.on('timeout', function() {
        console.log('socketOutput client Socket timeout: ');
    });

    client.on('drain', function() {
        console.log('socketOutput client Socket drain: ');
    });

    client.on('lookup', function() {
        console.log('socketOutput client Socket lookup: ');
    });
    return client;
}

net.writeData = function (socket, data){
  var success = !socket.write(data);
  if (!success){
      console.log("socketOutput Server Send Fail");
  }
}





var address_conf_t = new struct("address_conf_t", [
    "IpAddress", struct.char(16),
    "EMSPortNo", struct.uint16(),
]);

var floor_rad_conf_t = new struct("floor_rad_conf_t", [
    "ControlOption", struct.uint32(),
    "RoomCount", struct.int32(),
    "UseTsurf", struct.int32(),
    "Troom_set", struct.float32(),
    "Tsurf_set", struct.float32(),
    "Troom_cr", struct.float32(),
    "Tsurf_cr", struct.float32(),
    "Tctrl_res", struct.float32()
]);

var solbeach_conf_t = new struct("solbeach_conf_t", [
    "ControlOption", struct.uint32(),
    "ZoneCnt", struct.int32(),
    "HCMode", struct.int32(),
    "DamperAutoManual", struct.int32(),
    "PPMco2_set", struct.int32(),
    "ControlRdamp", struct.int32(),
    "NotifyIntervalSec", struct.int32(),
    "Tzone_set", struct.float32(),
    "Tctrl_res", struct.float32(),
    "Rdamp_set", struct.float32(),
    "Rdamp_min", struct.float32(),
    "Rdamp_max", struct.float32(),
    "Rdamp_ctrl_res", struct.float32()
]);

var var_temp_conf_t = new struct("var_temp_conf_t", [
    "HeatingHighTemp", struct.float32(),
    "HeatingLowTemp", struct.float32(),
    "HeatingDelatTemp", struct.float32(),
    "LowCoolingTemp", struct.float32()
]);

var peak_demand_conf_t = new struct("peak_demand_conf_t", [
    "MaxHeatingRoom", struct.uint32(),
    "NightMaxHeatingRoom", struct.uint32()
]);

var optimal_stop_conf_t = new struct("optimal_stop_conf_t", [
    "OptimalStopTimeSec", struct.int8()
]);

var demand_response_conf_t = new struct("demand_response_conf_t", [
    "DRTemp", struct.float32(),
    "DRTimeHour", struct.int8()
]);

var pre_heating_conf_t = new struct("pre_heating_conf_t", [
    "Option", struct.int8(),
    "Tout_avg", struct.float32(),
    "WF_Toutdoor", struct.int8(),
    "WF_Tdiff", struct.int8(),
    "IncTempRate", struct.float32(),
    "DecTempRate", struct.float32()
]);

var log_conf_t = new struct("log_conf_t", [
    "LogOption", struct.uint16(),
    "LogDir", struct.char(16),
    "StatFileName", struct.char(16),
    "LogFileName", struct.char(16),
    "DBFileName", struct.char(16),
    "LogPeriod", struct.int8(),
    "StatPeriod", struct.int8(),
    "DBStatPeriod", struct.int8()
]);

var control_data_t = new struct("control_data_t", [
    "SiteInfo", struct.uint16(),
    "ModuleIndex", struct.float32(),
    "Module", struct.float32(),
    "SetPoint", struct.uint32(),
    "fValue", struct.int8(),
    "DataLen", struct.int8()
]);

var room_config_t = new struct("room_config_t", [
    "RoomNo", struct.uint16(),
    "Tset", struct.float32(),
    "Tcr", struct.float32(),
    "CheckInOutEnable", struct.uint32(),
    "CheckInTime", struct.int8(),
    "CheckOutTime", struct.int8()
]);

var manual_heating_t = new struct("manual_heating_t", [
    "RoomNo", struct.uint16(),
    "HeatingMode", struct.uint16(),
    "HeatingTimeSec", struct.uint32(),
    "Tset", struct.float32(),
    "Tset_cr", struct.float32()
]);

var ems_sys_config_t = new struct("ems_sys_config_t", [
    "SiteInfo", struct.uint16(),
    "PacketMinIntervalSec", struct.uint32(),
    "ControlPeriodSec", struct.uint32(),
    "tAddr", address_conf_t,
    "tRemoteAddr", address_conf_t,
    "tFloorRadConf", floor_rad_conf_t,
    "tSolBeachConf", solbeach_conf_t,
    "tVariableTemp", var_temp_conf_t,
    "tPeak", peak_demand_conf_t,
    "tOptimalStop", optimal_stop_conf_t,
    "tDemandResponse", demand_response_conf_t,
    "tPreHeating", pre_heating_conf_t,
    "tLog", log_conf_t
]);

var ems_msg_header_t = new struct("ems_msg_header_t", [
    "Preamble", struct.uint16(),
    "Version", struct.uint16(),
    "Length", struct.uint16(),
    "SessionId", struct.uint16(),
    "SeqNo", struct.uint16(),
    "MsgType", struct.uint16(),
    "MsgStatus", struct.uint16(),
    "Reserved", struct.uint8(6)
]);

var ems_auth_req_t = new struct("ems_auth_req_t", [
    "szAuthId", struct.char(33),
    "szAuthPassword", struct.char(33),
    "UserLevel", struct.uint16(),
    "SiteInfo", struct.uint16()
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

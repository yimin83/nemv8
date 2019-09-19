
var net_client = require('net');
var router = require('./../rooms')
var struct = require("cpp-struct-js");
var net = {};
const ems_msg_type_e = {
	Msg_Type_Auth : 0x10,
	Msg_Type_Status : 0x20,
	Msg_Type_Control : 0x30,
	Msg_Type_Alarm : 0x40,
	Msg_Type_Clear : 0x50,
	Msg_Type_OAM : 0x60,
	Msg_Type_IPC_Config : 0xf0,
	Msg_Type_MAX : 0xff
};


const oam_msg_type_e = {
	oam_set_sys_config : 1,		// if you change this, you should change _ems_msg_type_stat_e [_set_sys_config] too
	oam_get_sys_config : 2,			// get sys config
	oam_cmd_floorRad_manual_heating : 3,
	oam_cmd_floorRad_room_state : 4,
	oam_cmd_checkIn : 5,
	oam_set_floorRad_room_config : 6,
	oam_get_floorRad_room_config : 7,
	oam_set_solBeach_zone_config : 8,
	oam_get_solBeach_zone_config : 9,
	oam_set_solBeach_damper_scheduler : 10,
	oam_get_solBeach_damper_scheduler : 11,
	oam_event_alarm : 12
};

net.getConnection = function (){
    //서버에 해당 포트로 접속
    var client = "";
    var recvData = [];
    var local_port = "";

    client = net_client.connect({port: 15000, host:'localhost'}, function() {
        console.log("================================= net_client.connect start =====================================");
        console.log('connect success');
        console.log('local = ' + this.localAddress + ':' + this.localPort);
        console.log('remote = ' + this.remoteAddress + ':' +this.remotePort);
				local_port = this.localPort;
				//this.setEncoding('utf8');
        //this.setTimeout(600000); // timeout : 10분
				console.log("=================================  net_client.connect end  =====================================");
    });

    // 접속 종료 시 처리
    client.on('close', function() {
			console.log("================================= client.on.close start =====================================");
			console.log("client Socket Closed : " + " localport : " + local_port);
			console.log("=================================   client.on.close end  =====================================");
    });

// 데이터 수신 후 처리
    client.on('data', function(data) {
        console.log("socketOutput data recv log======================================================================");
        if(data.length > 0){
            //bufTestRevc = new Buffer.alloc(6);
          var decodeDat = ems_msg_header_t.decode(data, 0, {endian:"BE"});
					console.log("decodeDat seqNo : " + decodeDat.SeqNo)
          if(decodeDat.MsgType  == ems_msg_type_e.Msg_Type_Auth){
            console.log("Auth!!!!!")
          } else if(decodeDat.MsgType  == ems_msg_type_e.Msg_Type_OAM){
            console.log("OAM!!!!")
            processOAMmsg(data, decodeDat.SeqNo)
          }

        }
    });

    client.on('end', function() {
        console.log('socketOutput client Socket End');
    });

    client.on('error', function(err) {
        console.log('socketOutput client Socket Error: '+ JSON.stringify(err));
				client.connect(15000, 'localhost');
    });

		client.on('disconnect', function(){
			console.log('disconnected..');
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

net.writeData = function (socket, data, seq){
  console.log('writeData start : ' + data.toString('hex') + ", seq : " + seq)
  var success = !socket.write(data);
  if(!success){
        (function(socket, data){
            socket.once('drain', function(){
                writeData(socket, data);
            });
        })(socket, data)
    }
}


net.getSeq = function(){
	return
}
var emsSysConfig
var manualHeating
var roomConfig
var ahuZoneConfigMsg
var damperSchedulerConfig
var processOAMmsg = function (data, seq){
  var ret = 0;
	let res
  var oamMsgDat = oam_msg_t.decode(data, ems_msg_header_t.size(), {endian:"BE"});
  console.log("seq : " + seq + ", oamMsgDat : " + oamMsgDat.OAMMsgType +", " + oamMsgDat.DataLen +", "  + oamMsgDat.Data + ", ems_sys_config_t.size() : " + ems_sys_config_t.size());
  if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_set_sys_config || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_sys_config )
   && oamMsgDat.DataLen == ems_sys_config_t.size()){
     var emsSysConfigDat = ems_sys_config_t.decode(data, ems_msg_header_t.size()+oam_msg_t.size(), {endian:"LE"});
		 if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_sys_config)
		 	  router.setSeqMap(seq, JSON.stringify(emsSysConfigDat))
  }
  else if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_cmd_floorRad_manual_heating && oamMsgDat.DataLen == manual_heating_msg_t.size()){
      console.log("oamMsgDat.OAMMsgType = " + oamMsgDa.OAMMsgType)
  }
  else if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_floorRad_room_config || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_set_floorRad_room_config)
   && oamMsgDat.DataLen == room_config_t.size()){
      var roomConfigDat = room_config_t.decode(data, ems_msg_header_t.size()+oam_msg_t.size(), {endian:"BE"});
			if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_floorRad_room_config)
      	router.setSeqMap(seq, JSON.stringify(roomConfigDat))
  }
  else if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_solBeach_zone_config || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_set_solBeach_zone_config)
   && oamMsgDat.DataLen == ahu_zone_config_msg_t.size()){
      var ahuDat = ahu_zone_config_msg_t.decode(data, ems_msg_header_t.size()+oam_msg_t.size(), {endian:"BE"});
			if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_solBeach_zone_config)
      	router.setSeqMap(seq, JSON.stringify(ahuDat))
  }
  else if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_solBeach_damper_scheduler || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_set_solBeach_damper_scheduler)
   && oamMsgDat.DataLen == damper_scheduler_config_t.size()){
      var damperScheConfigDat = damper_scheduler_config_t.decode(data, ems_msg_header_t.size()+oam_msg_t.size(), {endian:"BE"});
			if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_solBeach_damper_scheduler)
      	router.setSeqMap(seq, JSON.stringify(damperScheConfigDat))
  }

  else if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_event_alarm || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_event_alarm)){
      var damperScheConfigDat = damper_scheduler_config_t.decode(data, ems_msg_header_t.size()+oam_msg_t.size(), {endian:"BE"});
			if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_solBeach_damper_scheduler)
      	router.setSeqMap(seq, JSON.stringify(damperScheConfigDat))
  }
  else {
      console.log("else!!!! oamMsgDat.OAMMsgType = " + oamMsgDat.OAMMsgType)
			ret = -1;
  }
  return ret;
}
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
net.makeEmsMsgHeader_t = function(preamble, version, length, sessionId, seqNo, msgType, msgStatus, reserved){
  var buffer = new Buffer(ems_msg_header_t.size());
  ems_msg_header_t.encode(buffer,0, {
    Preamble: preamble,
    Version: version,
    Length: length,
    SessionId: sessionId,
    SeqNo: seqNo,
    MsgType: msgType,
    MsgStatus: msgStatus,
    Reserved: reserved
  },{endian:"BE"})
  return buffer;
}
net.getSizeEmsMsgHeader_t = function(){
  return ems_msg_header_t.size()
}

var ems_auth_req_t = new struct("ems_auth_req_t", [
    "szAuthId", struct.char(33),
    "szAuthPassword", struct.char(33),
    "UserLevel", struct.uint16(),
    "SiteInfo", struct.uint16()
]);
net.makeEmsAuthReq_t = function(szAuthId, szAuthPassword, userLevel, siteInfo){
  var buffer = new Buffer(ems_auth_req_t.size());
  ems_auth_req_t.encode(buffer,0, {
    szAuthId: szAuthId,
    szAuthPassword: szAuthPassword,
    UserLevel: userLevel,
    SiteInfo: siteInfo
  },{endian:"BE"})
  return buffer;
}
net.getSizeEmsAuthReq_t = function(){
  return ems_auth_req_t.size()
}

var address_conf_t = new struct("address_conf_t", [
    "IpAddress", struct.char(16),
    "EMSPortNo", struct.uint16(),
]);
net.makeAddressConf_t = function(ipAddress, emsPortNo){
  var buffer = new Buffer(address_conf_t.size());
  address_conf_t.encode(buffer,0, {
    IpAddress: ipAddress,
    EMSPortNo: emsPortNo
  },{endian:"BE"})
  return buffer;
}
net.getSizeAddressConf_t = function(){
  return address_conf_t.size()
}

var log_conf_t = new struct("log_conf_t", [
    "LogOption", struct.int32(),
    "LogDir", struct.char(16),
    "StatFileName", struct.char(16),
    "LogFileName", struct.char(16),
    "DBFileName", struct.char(16),
    "LogPeriod", struct.int32(),
    "StatPeriod", struct.int32(),
    "DBStatPeriod", struct.int32()
]);
net.makeLogConf_t = function(logOption, logDir, statFileName, logFileName, dbFileName, logPeriod, statPeriod, dbStatPeriod){
  var buffer = new Buffer(log_conf_t.size());
  log_conf_t.encode(buffer,0, {
    LogOption: logOption,
    LogDir: logDir,
    StatFileName: statFileName,
    LogFileName: logFileName,
    DBFileName: dbFileName,
    LogPeriod: logPeriod,
    StatPeriod: statPeriod,
    DBStatPeriod: dbStatPeriod
  },{endian:"BE"})
  return buffer;
}
net.getLogConf_t = function(){
  return log_conf_t.size()
}

var var_temp_conf_t = new struct("var_temp_conf_t", [
    "HeatingHighTemp", struct.float32(),
    "HeatingLowTemp", struct.float32(),
    "HeatingDelatTemp", struct.float32(),
    "LowCoolingTemp", struct.float32()
]);
net.makeVarTempConf_t = function(heatingHighTemp, heatingLowTemp, heatingDelatTemp, lowCoolingTemp){
  var buffer = new Buffer(var_temp_conf_t.size());
  var_temp_conf_t.encode(buffer,0, {
    HeatingHighTemp: heatingHighTemp,
    HeatingLowTemp: heatingLowTemp,
    HeatingDelatTemp: heatingDelatTemp,
    LowCoolingTemp: lowCoolingTemp
  },{endian:"BE"})
  return buffer;
}
net.getSizeVarTempConf_t = function(){
  return var_temp_conf_t.size()
}

var peak_demand_conf_t = new struct("peak_demand_conf_t", [
    "MaxHeatingRoom", struct.uint32(),
    "NightMaxHeatingRoom", struct.uint32()
]);
net.makePeakDemandConf_t = function(maxHeatingRoom, nightMaxHeatingRoom){
  var buffer = new Buffer(peak_demand_conf_t.size());
  peak_demand_conf_t.encode(buffer,0, {
    MaxHeatingRoom: maxHeatingRoom,
    NightMaxHeatingRoom: nightMaxHeatingRoom
  },{endian:"BE"})
  return buffer;
}
net.getSizePeakDemandConf_t = function(){
  return peak_demand_conf_t.size()
}

var optimal_stop_conf_t = new struct("optimal_stop_conf_t", [
    "OptimalStopTimeSec", struct.int32()
]);
net.makeOptimalStopConf_t = function(optimalStopTimeSec){
  var buffer = new Buffer(optimal_stop_conf_t.size());
  optimal_stop_conf_t.encode(buffer,0, {
    OptimalStopTimeSec: optimalStopTimeSec
  },{endian:"BE"})
  return buffer;
}
net.getSizeOptimalStopConf_t = function(){
  return optimal_stop_conf_t.size()
}

var demand_response_conf_t = new struct("demand_response_conf_t", [
    "DRTemp", struct.float32(),
    "DRTimeHour", struct.int32()
]);
net.makeDemandResponseConf_t = function(drTemp, drTimeHour){
  var buffer = new Buffer(demand_response_conf_t.size());
  demand_response_conf_t.encode(buffer,0, {
    DRTemp: drTemp,
    DRTimeHour: drTimeHour
  },{endian:"BE"})
  return buffer;
}
net.getSizeDemandResponseConf_t = function(){
  return demand_response_conf_t.size()
}

var pre_heating_conf_t = new struct("pre_heating_conf_t", [
    "Option", struct.int32(),
    "Tout_avg", struct.float32(),
    "WF_Toutdoor", struct.int32(),
    "WF_Tdiff", struct.int32(),
    "IncTempRate", struct.float32(),
    "DecTempRate", struct.float32()
]);
net.makePreHeatingConf_t = function(option, tout_avg, wf_Toutdoor, wf_Tdiff, incTempRate, decTempRate){
  var buffer = new Buffer(pre_heating_conf_t.size());
  pre_heating_conf_t.encode(buffer,0, {
    Option: option,
    Tout_avg: tout_avg,
    WF_Toutdoor: wf_Toutdoor,
    WF_Tdiff: wf_Tdiff,
    IncTempRate: incTempRate,
    DecTempRate: decTempRate
  },{endian:"BE"})
  return buffer;
}
net.getSizePreHeatingConf_t = function(){
  return pre_heating_conf_t.size()
}

var floor_rad_conf_t = new struct("floor_rad_conf_t", [
    "ControlOption", struct.uint32(),
    "RoomCount", struct.int32(),
    "UseTsurf", struct.int32(),
    "Troom_set", struct.float32(),
    "Tsurf_set", struct.float32(),
    "Troom_cr", struct.float32(),
    "Tsurf_cr", struct.float32(),
    "Tctrl_res", struct.float32(),
    "TelNumber0", struct.char(12),
    "TelNumber1", struct.char(12),
    "TelNumber2", struct.char(12),
    "TelNumber3", struct.char(12),
    "TelNumber4", struct.char(12),
    "tVariableTemp", var_temp_conf_t,
    "tPeak", peak_demand_conf_t,
    "tOptimalStop", optimal_stop_conf_t,
    "tDemandResponse", demand_response_conf_t,
    "tPreHeating", pre_heating_conf_t // reserved.
]);
net.makeFloorRadConf_t = function(controlOption, roomCount, useTsurf, troom_set, tsurf_set, troom_cr, tsurf_cr, tctrl_res, telNumber0, telNumber1, telNumber2, telNumber3, telNumber4, tVariableTemp, tPeak, tOptimalStop, tDemandResponse, tPreHeating){
  var buffer = new Buffer(floor_rad_conf_t.size());
  floor_rad_conf_t.encode(buffer,0, {
    ControlOption: controlOption,
    RoomCount: roomCount,
    UseTsurf: useTsurf,
    Troom_set: troom_set,
    Tsurf_set: tsurf_set,
    Troom_cr: troom_cr,
    Tsurf_cr: tsurf_cr,
    Tctrl_res: tctrl_res,
		TelNumber0: telNumber0,
		TelNumber1: telNumber1,
		TelNumber2: telNumber2,
		TelNumber3: telNumber3,
		TelNumber4: telNumber4,
    tVariableTemp: tVariableTemp,
    tPeak: tPeak,
    tOptimalStop: tOptimalStop,
    tDemandResponse: tDemandResponse,
    tPreHeating: tPreHeating
  },{endian:"BE"})
  return buffer;
}
net.getSizeFloorRadConf_t = function(){
  return floor_rad_conf_t.size()
}


var damp_control_conf_t = new struct("damp_control_conf_t", [
    "DamperCtrlMode", struct.int32(),
    "Rdamp_set", struct.float32(),
    "Rdamp_min", struct.float32(),
    "Rdamp_max", struct.float32(),
    "Rdamp_ctrl_res", struct.float32(),
    "NotifyIntervalSec", struct.int32(),
    "PPMco2_set", struct.int32(),
    "DamperAutoManual", struct.uint32(),
    "NotifyStartHour", struct.uint32(),
    "NotifyEndHour", struct.int32()
]);
net.makeDampControlConf_t = function( damperCtrlMode, rdamp_set, rdamp_min, rdamp_max, rdamp_ctrl_res, notifyIntervalSec, ppmCo2_set, damperAutoManual, notifyStartHour, notifyEndHour){
  var buffer = new Buffer(damp_control_conf_t.size());
  damp_control_conf_t.encode(buffer,0, {
    DamperCtrlMode: damperCtrlMode,
    Rdamp_set: rdamp_set,
    Rdamp_min: rdamp_min,
    Rdamp_max: rdamp_max,
    Rdamp_ctrl_res: rdamp_ctrl_res,
    NotifyIntervalSec: notifyIntervalSec,
    PPMco2_set: ppmCo2_set,
    DamperAutoManual: damperAutoManual,
    NotifyStartHour: notifyStartHour,
    NotifyEndHour: notifyEndHour
  },{endian:"BE"})
  return buffer;
}
net.getSizeDampControlConf_t = function(){
  return damp_control_conf_t.size()
}

var pid_control_conf_t = new struct("pid_control_conf_t", [
    "PIDCtrlMode", struct.uint32(),
    "ControlStepValue", struct.uint32(),
    "Kp", struct.float32(),
    "Ki", struct.float32(),
    "Kd", struct.float32(),
]);
net.makePidControlConf_t = function( pidCtrlMode, controlStepValue, kp, ki, kd){
  var buffer = new Buffer(pid_control_conf_t.size());
  pid_control_conf_t.encode(buffer,0, {
    PIDCtrlMode: pidCtrlMode,
    ControlStepValue: controlStepValue,
    Kp: kp,
    Ki: ki,
    Kd: kd
  },{endian:"BE"})
  return buffer;
}
net.getSizePidControlConf_t = function(){
  return pid_control_conf_t.size()
}

var co2_conf_t = new struct("co2_conf_t", [
		"ControlMode", struct.uint32(),
    "PPMco2_rate_wf", struct.int32(),
		"PPMco2_wf", struct.int32(),
    "PPMco2_empty", struct.int32(),
    "PPMco2_occupied", struct.int32(),
    "PPMco2_inc_rate", struct.int32(),
    "PPMco2_dec_rate", struct.int32(),
    "PPMco2_inc_time", struct.int32(),
    "PPMco2_dec_time", struct.int32()
]);
net.makeCo2Conf_t = function( controlMode, ppmCo2_rate_wf, ppmCo2_wf, ppmCo2_empty, ppmCo2_occupied, ppmCo2_inc_rate, ppmCo2_dec_rate, ppmCo2_inc_time, ppmCo2_dec_time){
  var buffer = new Buffer(co2_conf_t.size());
  co2_conf_t.encode(buffer,0, {
		ControlMode: controlMode,
    PPMco2_rate_wf: ppmCo2_rate_wf,
		PPMco2_wf: ppmCo2_wf,
    PPMco2_empty: ppmCo2_empty,
    PPMco2_occupied: ppmCo2_occupied,
    PPMco2_inc_rate: ppmCo2_inc_rate,
    PPMco2_dec_rate: ppmCo2_dec_rate,
    PPMco2_inc_time: ppmCo2_inc_time,
    PPMco2_dec_time: ppmCo2_dec_time,
  },{endian:"BE"})
  return buffer;
}
net.getSizeCo2Conf_t = function(){
  return co2_conf_t.size()
}

var solbeach_conf_t = new struct("solbeach_conf_t", [
    "ControlOption", struct.uint32(),
    "ZoneCnt", struct.int32(),
    "HCMode", struct.int32(),
    "Tzone_set", struct.float32(),
    "Tctrl_res", struct.float32(),
    "TelNumber0", struct.char(12),
    "TelNumber1", struct.char(12),
    "TelNumber2", struct.char(12),
    "TelNumber3", struct.char(12),
    "TelNumber4", struct.char(12),
		"CO2LoadPeriodSec", struct.uint32(),
    "tRdamp", damp_control_conf_t,
	  "tPID", pid_control_conf_t,
		"tC02Conf", co2_conf_t,
]);
net.makeSolbeachConf_t = function(controlOption, zoneCnt, hcMode, tzone_set, tctrl_res, telNumber0, telNumber1, telNumber2, telNumber3, telNumber4, co2LoadPeriodSec, tRdamp, tPID){
  var buffer = new Buffer(solbeach_conf_t.size());
  solbeach_conf_t.encode(buffer,0, {
    ControlOption: controlOption,
    ZoneCnt: zoneCnt,
    HCMode: hcMode,
    Tzone_set: tzone_set,
    Tctrl_res: tctrl_res,
		TelNumber0: telNumber0,
		TelNumber1: telNumber1,
		TelNumber2: telNumber2,
		TelNumber3: telNumber3,
		TelNumber4: telNumber4,
		CO2LoadPeriodSec: co2LoadPeriodSec,
    tRdamp: tRdamp,
    tPID: tPID
  },{endian:"BE"})
  return buffer;
}
net.getSizeSolbeachConf_t = function(){
  return solbeach_conf_t.size()
}

var ems_sys_config_t = new struct("ems_sys_config_t", [
    "PacketMinIntervalSec", struct.uint32(),
    "ControlPeriodSec", struct.uint32(),
    "tAddr", address_conf_t,
    "tLog", log_conf_t,
    "tRemoteAddr", address_conf_t,
    "tFloorRadConf", floor_rad_conf_t,
    "tSolBeachConf", solbeach_conf_t
]);
var transEmsSysConfigToJSON = function(emsSysConfig){
	var testList = new Array() ;
	for(var i=1; i<=2; i++){
		var data = new Object() ;
	  data.number = i ;
	  data.name = "Tester #" + i ;
	  testList.push(data) ;
	  }
	  var jsonData = JSON.stringify(testList) ;
		return jsonData
}
net.makeEmsSysConf_t = function(packetMinIntervalSec, controlPeriodSec, tAddr, tLog, tRemoteAddr, tFloorRadConf, tSolBeachConf){
  var buffer = new Buffer(ems_sys_config_t.size());
  ems_sys_config_t.encode(buffer,0, {
    PacketMinIntervalSec: packetMinIntervalSec,
    ControlPeriodSec: controlPeriodSec,
    tAddr: tAddr,
    tLog: tLog,
    tRemoteAddr: tRemoteAddr,
    tFloorRadConf: tFloorRadConf,
    tSolBeachConf: tSolBeachConf
  },{endian:"LE"})
  return buffer;
}
net.getSizeEmsSysConf_t = function(){
  return ems_sys_config_t.size()
}

var control_data_t = new struct("control_data_t", [
    "SiteInfo", struct.uint16(),
    "ModuleIndex", struct.float32(),
    "Module", struct.float32(),
    "SetPoint", struct.uint32(),
    "fValue", struct.int8(),
    "DataLen", struct.int8()
]);
net.makeControlData_t = function(packetMinIntervalSec, moduleIndex, module_, setPoint, fValue, dataLen){
  var buffer = new Buffer(control_data_t.size());
  control_data_t.encode(buffer,0, {
    SiteInfo: siteInfo,
    ModuleIndex: moduleIndex,
    Module: module_,
    SetPoint: setPoint,
    fValue: fValue,
    DataLen: dataLen
  },{endian:"BE"})
  return buffer;
}
net.getSizeControlData_t = function(){
  return control_data_t.size()
}

var oam_msg_t = new struct("oam_msg_t", [
    "OAMMsgType", struct.uint16(),
    "DataLen", struct.uint16(),
    "Data", struct.uint32(2)
]);
net.makeOamMsg_t = function(oamMsgType, dataLen, data){
  var buffer = new Buffer(oam_msg_t.size());
  oam_msg_t.encode(buffer,0, {
    OAMMsgType: oamMsgType,
    DataLen: dataLen,
    Data: data
  },{endian:"BE"})
  return buffer;
}
net.getSizeOamMsg_t = function(){
  return oam_msg_t.size()
}

var manual_heating_t = new struct("manual_heating_t", [
    "RoomNo", struct.uint16(),
    "HeatingMode", struct.uint16(),
    "HeatingTimeSec", struct.uint32(),
    "Tset", struct.float32(),
    "Tset_cr", struct.float32()
]);
net.makeManualHeating_t = function(roomNo, heatingMode, heatingTimeSec, tset, tset_cr){
  var buffer = new Buffer(manual_heating_t.size());
  manual_heating_t.encode(buffer,0, {
    RoomNo: roomNo,
    HeatingMode: heatingMode,
    HeatingTimeSec: heatingTimeSec,
    Tset: tset,
    Tset_cr: tset_cr
  },{endian:"BE"})
  return buffer;
}
net.getSizeManualHeating_t = function(){
  return manual_heating_t.size()
}

var room_config_t = new struct("room_config_t", [
    "RoomNo", struct.uint16(),
    "Area", struct.uint8(),
    "Direction", struct.uint8(),
    "ExteriorWallCnt", struct.uint8(),
    "Troom_set", struct.float32(),
    "Tsurf_set", struct.float32(),
    "Troom_cr", struct.float32(),
    "Tsurf_cr", struct.float32(),
    "CheckInOutEnable", struct.int32(),
    "CheckInTime", struct.uint32(),
    "CheckOutTime", struct.uint32(),
    "szDesc", struct.char(32)
]);
net.makeRoomConfig_t = function(roomNo, area, direction, exteriorWallCnt, troom_set, tsurf_set, troom_cr, tsurf_cr, checkInOutEnable, checkInTime, checkOutTime, szDesc){
  var buffer = new Buffer(room_config_t.size());
  room_config_t.encode(buffer,0, {
    RoomNo: roomNo,
    Area: area,
    Direction: direction,
    ExteriorWallCnt: exteriorWallCnt,
    Troom_set: troom_set,
    Tsurf_set: tsurf_set,
    Troom_cr: troom_cr,
    Tsurf_cr: tsurf_cr,
    CheckInOutEnable: checkInOutEnable,
    CheckInTime: checkInTime,
    CheckOutTime: checkOutTime,
    szDesc: szDesc
  },{endian:"BE"})
  return buffer;
}
net.getSizeRoomConfig_t = function(){
  return room_config_t.size()
}


var ahu_zone_config_msg_t = new struct("ahu_zone_config_msg_t", [
    "AhuIndex", struct.uint16(),
    "NotifyOccupantsState", struct.uint8(),
    "HCMode", struct.int8(),
		"FanAutoManual", struct.int8(),
    "DamperAutoManual", struct.int8(),
    "Tzone_set", struct.float32(),
    "Rdamp_set", struct.float32(),
    "PPMco2_set", struct.int32(),
    "Desc", struct.char(32)
]);
net.makeAhuZoneConfigMsg_t = function(ahuIndex, notifyOccupantsState, hcMode, fanAutoManual, damperAutoManual, tzone_set, rdamp_set, ppmCo2_set, desc){
  var buffer = new Buffer(ahu_zone_config_msg_t.size());
  ahu_zone_config_msg_t.encode(buffer,0, {
    AhuIndex: ahuIndex,
    NotifyOccupantsState: notifyOccupantsState,
    HCMode: hcMode,
    FanAutoManual: fanAutoManual,
    DamperAutoManual: damperAutoManual,
    Tzone_set: tzone_set,
    Rdamp_set: rdamp_set,
    PPMco2_set: ppmCo2_set,
    Desc: desc
  },{endian:"BE"})
  return buffer;
}
net.getSizeAhuZoneConfigMsg_t = function(){
  return ahu_zone_config_msg_t.size()
}

var ahu_zone_config_t = new struct("ahu_zone_config_t", [
    "AhuIndex", struct.uint16(),
    "NotifyOccupantsState", struct.uint8(),
    "HCMode", struct.char(),
		"FanAutoManual", struct.char(),
    "DamperAutoManual", struct.char(),
    "Tzone_set", struct.float32(),
    "Rdamp_set", struct.float32(),
    "PPMco2_set", struct.int32(),
    "Desc", struct.char(32)
]);
net.makeAhuZoneConfig_t = function(ahuIndex, notifyOccupantsState, hcMode, fanAutoManual, damperAutoManual, tzone_set, rdamp_set, ppmCo2_set, desc){
  var buffer = new Buffer(ahu_zone_config_t.size());
  ahu_zone_config_t.encode(buffer,0, {
    AhuIndex: ahuIndex,
    NotifyOccupantsState: notifyOccupantsState,
    HCMode: hcMode,
    FanAutoManual: fanAutoManual,
    DamperAutoManual: damperAutoManual,
    Tzone_set: tzone_set,
    Rdamp_set: rdamp_set,
    PPMco2_set: ppmCo2_set,
    Desc: desc
  },{endian:"BE"})
  return buffer;
}
net.getSizeAhuZoneConfig_t = function(){
  return ahu_zone_config_t.size()
}

var damper_scheduler_t = new struct("damper_scheduler_t", [
    "Mode", struct.uint8(),
    "Hour", struct.uint8(),
    "Min", struct.uint8(),
    "Ratio", struct.uint8()
]);
net.makeDamperScheduler_t = function(mode, hour, hcMode, min, ratio){
  var buffer = new Buffer(damper_scheduler_t.size());
  damper_scheduler_t.encode(buffer,0, {
    Mode: mode,
    Hour: hour,
    Min: min,
    Ratio: ratio
  },{endian:"BE"})
  return buffer;
}
net.getSizeDamperScheduler_t = function(){
  return damper_scheduler_t.size()
}

var damper_scheduler_config_t = new struct("damper_scheduler_t", [
    "AhuIndex", struct.uint16(),
    "Reserved", struct.uint16(),
    "tSch", struct.type(damper_scheduler_t, 12)
]);
net.makeDamperSchedulerConfig_t = function(ahuIndex, reserved, tSch){
  var buffer = new Buffer(damper_scheduler_config_t.size());
  damper_scheduler_config_t.encode(buffer,0, {
    AhuIndex: ahuIndex,
    Reserved: reserved,
    tSch: tSch
  },{endian:"BE"})
  return buffer;
}
net.getSizeDamperSchedulerConfig_t = function(){
  return damper_scheduler_config_t.size()
}

var check_in_cmd_t = new struct("check_in_cmd_t", [
	"RoomNo", struct.uint16(),
	"CheckInOutEnable", struct.uint16(),
	"CheckIn", struct.uint32(),
	"CheckOut", struct.uint32(),
]);
net.makeCheckInCmd_t = function(roomNo, checkInOutEnable, checkIn, checkOut){
  var buffer = new Buffer(check_in_cmd_t.size());
  check_in_cmd_t.encode(buffer,0, {
    RoomNo: roomNo,
    CheckInOutEnable: checkInOutEnable,
    CheckIn: checkIn,
    CheckOut: checkOut
  },{endian:"BE"})
  return buffer;
}
net.getSizeCheckIn_t = function(){
  return check_in_cmd_t.size()
}



var ems_alarm_t = new struct("ems_alarm_t", [
	"Time", struct.uint32(),
	"Seq", struct.uint16(),
	"SiteInfo", struct.uint16(),
	"Module", struct.uint16(),
	"Level", struct.uint16(),
	"ModuleIndex", struct.uint16(),
	"szContent", struct.char(256)
]);
net.makeEmsAlarm_t = function(ulTime, usSeq, usSiteInfo, usModule, usLevel, usModuleIndex, szContent){
  var buffer = new Buffer(ems_alarm_t.size());
  ems_alarm_t.encode(buffer,0, {
    Time: ulTime,
    Seq: usSeq,
    SiteInfo: usSiteInfo,
    Module: usModule,
    Level: usLevel,
    ModuleIndex: usModuleIndex,
    szContent: szContent
  },{endian:"BE"})
  return buffer;
}
net.getSizeEmsAlarm_t = function(){
  return ems_alarm_t.size()
}

module.exports = net;

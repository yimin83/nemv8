var net_client = require('net');
var router = require('./../rooms')
var struct = require("cpp-struct-js");
const config = require('./../../../config.js')
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
	oam_set_sys_config: 1,		// if you change this, you should change _ems_msg_type_stat_e [_set_sys_config] too
	oam_get_sys_config: 2,			// get sys config

	oam_cmd_floorRad_manual_heating: 3,
	oam_cmd_floorRad_room_state: 4,
	oam_cmd_checkIn: 5,
	oam_cmd_load_db: 6,

	oam_set_floorRad_room_config: 7,
	oam_get_floorRad_room_config: 8,

	oam_set_solBeach_zone_config: 9,
	oam_get_solBeach_zone_config: 10,

	oam_set_solBeach_damper_scheduler: 11,
	oam_get_solBeach_damper_scheduler: 12,

	oam_set_floorRad_room_state: 13,
	oam_get_floorRad_room_state: 14,

	oam_set_floorRad_room_priority: 15,
	oam_get_floorRad_room_priority: 16,

	oam_get_session_info: 17,

	oam_event_alarm: 18
};
const MAX_ROOM_CNT = 91
net.getConnection = function () {
    //서버에 해당 포트로 접속
    var client = '';
    var recvData = [];
    var local_port = '';

    client = net_client.connect({port: config.port, host: config.host}, function() {
        console.log("==================================== net_client.connect start  ========================================= : ");
        console.log('connect success');
        console.log('local = ' + this.localAddress + ':' + this.localPort);
        console.log('remote = ' + this.remoteAddress + ':' +this.remotePort);
				local_port = this.localPort;
				//this.setEncoding('utf8');
        //this.setTimeout(600000); // timeout : 10분
				console.log("====================================  net_client.connect end  ==========================================");
    });

    // 접속 종료 시 처리
    client.on('close', function() {
			console.log("==================================== client.on.close start ==========================================");
			console.log("client Socket Closed : " + " localport : " + local_port);
			console.log("====================================   client.on.close end  ==========================================");
    });

// 데이터 수신 후 처리
    client.on('data', function(data) {
        console.log("socketOutput data recv log===============================================================================");
        if(data.length > 0) {
            //bufTestRevc = new Buffer.alloc(6);
          var decodeDat = ems_msg_header_t.decode(data, 0, {endian:"BE"});
					console.log("decodeDat seqNo : " + decodeDat.SeqNo)
          if(decodeDat.MsgType == ems_msg_type_e.Msg_Type_Auth) {
            console.log("Auth!!!!!")
          } else if(decodeDat.MsgType  == ems_msg_type_e.Msg_Type_OAM) {
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
				client.connect(config.port, config.host);
				router.reconnectAuth()
    });

		client.on('disconnect', function() {
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

net.writeData = function (socket, data, seq) {
  // console.log('writeData start : ' + data.toString('hex') + ", seq : " + seq)
  var success = !socket.write(data);
  if(!success) {
        (function(socket, data) {
            socket.once('drain', function() {
                writeData(socket, data);
            });
        })(socket, data)
    }
}

var alarm = null
var processOAMmsg = function (data, seq) {
  var ret = 0;
	let res
  var oamMsgDat = oam_msg_t.decode(data, ems_msg_header_t.size(), {endian:"BE"});
  console.log("seq : " + seq + ", oamMsgDat : " + oamMsgDat.OAMMsgType +", oamMsgDat.DataLen : " + oamMsgDat.DataLen +", oamMsgDat.Data : "  + oamMsgDat.Data + ", ems_sys_config_t.size() : " + ems_sys_config_t.size());
  if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_sys_config || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_set_sys_config )
   && oamMsgDat.DataLen == ems_sys_config_t.size()) {
     var emsSysConfigDat = ems_sys_config_t.decode(data, ems_msg_header_t.size() +oam_msg_t.size(), {endian:"LE"});
		 if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_sys_config) {
			 router.setSeqMap(seq, JSON.stringify(emsSysConfigDat))
		 }
  }
  else if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_cmd_floorRad_manual_heating && oamMsgDat.DataLen == manual_heating_msg_t.size()) {
      console.log("oamMsgDat.OAMMsgType = " + oamMsgDa.OAMMsgType)
  }
  else if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_floorRad_room_config || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_set_floorRad_room_config)
   && oamMsgDat.DataLen == room_config_t.size()) {
      var roomConfigDat = room_config_t.decode(data, ems_msg_header_t.size() +oam_msg_t.size(), {endian:"BE"});
			if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_floorRad_room_config)
      	router.setSeqMap(seq, JSON.stringify(roomConfigDat))
  }
  else if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_solBeach_zone_config || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_set_solBeach_zone_config)
   && oamMsgDat.DataLen == ahu_zone_config_msg_t.size()) {
      var ahuDat = ahu_zone_config_msg_t.decode(data, ems_msg_header_t.size() +oam_msg_t.size(), {endian:"BE"});
			if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_solBeach_zone_config)
      	router.setSeqMap(seq, JSON.stringify(ahuDat))
  }
  else if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_solBeach_damper_scheduler || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_set_solBeach_damper_scheduler)
   && oamMsgDat.DataLen == damper_scheduler_config_t.size()) {
      var damperScheConfigDat = damper_scheduler_config_t.decode(data, ems_msg_header_t.size() +oam_msg_t.size(), {endian:"BE"});
			if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_solBeach_damper_scheduler)
      	router.setSeqMap(seq, JSON.stringify(damperScheConfigDat))
  }
  else if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_floorRad_room_state || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_set_floorRad_room_state)
   && oamMsgDat.DataLen == floor_rad_room_state_t.size()) {
      var floorRoomStateDat = floor_rad_room_state_t.decode(data, ems_msg_header_t.size() +oam_msg_t.size(), {endian:"BE"});
			if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_floorRad_room_state)
      	router.setSeqMap(seq, JSON.stringify(floorRoomStateDat))
  }
  else if((oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_floorRad_room_priority || oamMsgDat.OAMMsgType == oam_msg_type_e.oam_set_floorRad_room_priority)) {
      var floorRadRoomPriorityDat = floor_rad_room_priority_t.decode(data, ems_msg_header_t.size() +oam_msg_t.size(), {endian:"BE"});
			if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_get_floorRad_room_priority)
      	router.setSeqMap(seq, JSON.stringify(floorRadRoomPriorityDat))
  }
  else if(oamMsgDat.OAMMsgType == oam_msg_type_e.oam_event_alarm) {
		console.log("$$$$$$$$$$$$$$$$$$$$$$ recieve Alarm!!!$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    var emsAlarmDat = ems_alarm_t.decode(data, ems_msg_header_t.size() +oam_msg_t.size(), {endian:"BE"});
		processAlarm(emsAlarmDat, setAlarm)
  }
  else {
      console.log("else!!!! oamMsgDat.OAMMsgType = " + oamMsgDat.OAMMsgType)
			ret = -1;
  }
  return ret;
}
// var ems_alarm_t = new struct("ems_alarm_t", [
// 	"Time", struct.uint32(),
// 	"Seq", struct.uint16(),
// 	"SiteInfo", struct.uint16(),
// 	"Module", struct.uint16(),
// 	"Level", struct.uint16(),
// 	"ModuleIndex", struct.uint16(),
// 	"szContent", struct.char(256)
// ]);

var siteInfo = ['-', '오션벨리', '양양쏠비치'];
var moduleType = [
	'md_floor_rad', 'md_chiller', 'md_chiller_pump', 'md_ahu',
	'md_cooling_tower', 'md_cooling_tower_fan', 'md_boiler', 'md_damper',
	'md_co2_sensor', 'md_outdoor', 'md_max'];
var setAlarm = function(data) {
	console.log("################ setAlarm!!! ################")
	this.alarm = {
		'Time':data.Time,'Seq':data.Seq,
		'SiteInfo':siteInfo[data.SiteInfo],'Module':moduleType[data.Module],
		'Level':data.Level,'ModuleIndex':data.ModuleIndex,
		'szContent':data.szContent, 'beChecked':false
	}
	console.log("setAlarm : " +JSON.stringify(this.alarm))
}
net.getAlarm = function() {
	console.log("################ getAlarm!!! ################")
	return processGetAlarm(returnAlarm)
}
net.chkAlarm = function() {
	console.log("################ chkAlarm!!! ################")
	processClearAlarm(clearAlarm)
}

function processGetAlarm(callback) {
	console.log("################ processGetAlarm!!! ################")
	return callback(this.alarm)
}
function returnAlarm(data) {
	console.log("################ returnAlarm!!! ################")
	return data
}

function processClearAlarm(callback) {
	console.log("################ processClearAlarm!!! ################")
	callback()
}
function clearAlarm() {
	console.log("################ clearAlarm!!! ################")
	this.alarm.beChecked = true
}
function processAlarm (data, callback) {
  console.log("################ processAlarm start!!! ################")
	callback(data)
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

net.makeEmsMsgHeader_t = function(preamble, version, length, sessionId, seqNo, msgType, msgStatus, reserved) {
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
net.getSizeEmsMsgHeader_t = function() {
  return ems_msg_header_t.size()
}

var ems_auth_req_t = new struct("ems_auth_req_t", [
    "szAuthId", struct.char(33),
    "szAuthPassword", struct.char(33),
    "UserLevel", struct.uint16(),
    "SiteInfo", struct.uint16()
]);
net.makeEmsAuthReq_t = function(szAuthId, szAuthPassword, userLevel, siteInfo) {
  var buffer = new Buffer(ems_auth_req_t.size());
  ems_auth_req_t.encode(buffer,0, {
    szAuthId: szAuthId,
    szAuthPassword: szAuthPassword,
    UserLevel: userLevel,
    SiteInfo: (siteInfo|config.siteInfo)
  },{endian:"BE"})
  return buffer;
}
net.getSizeEmsAuthReq_t = function() {
  return ems_auth_req_t.size()
}

var address_conf_t = new struct("address_conf_t", [
    "IpAddress", struct.char(16),
    "PortNo", struct.uint16(),
]);
net.makeAddressConf_t = function(ipAddress, portNo) {
  var buffer = new Buffer(address_conf_t.size());
  address_conf_t.encode(buffer,0, {
    IpAddress: ipAddress,
    PortNo: portNo
  },{endian:"BE"})
  return buffer;
}
net.getSizeAddressConf_t = function() {
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
net.makeLogConf_t = function(logOption, logDir, statFileName, logFileName, dbFileName, logPeriod, statPeriod, dbStatPeriod) {
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
net.getLogConf_t = function() {
  return log_conf_t.size()
}

var db_confg_t = new struct("db_confg_t", [
		"tAddr", address_conf_t,
    "Name", struct.char(32),
    "ID", struct.char(32),
    "PassWd", struct.char(32)
]);
net.makeDbConf_t = function(tAddr, name, id, passWd) {
  var buffer = new Buffer(db_confg_t.size());
  db_confg_t.encode(buffer,0, {
    tAddr: tAddr,
    Name: name,
    ID: id,
    PassWd: passWd
  },{endian:"BE"})
  return buffer;
}
net.getDbConf_t = function() {
  return db_confg_t.size()
}

var sms_confg_t = new struct("sms_confg_t", [
    "ID", struct.char(32),
    "Key", struct.char(128)
]);
net.makeSmsConf_t = function(id, key) {
  var buffer = new Buffer(sms_confg_t.size());
  sms_confg_t.encode(buffer,0, {
    ID: id,
    Key: key
  },{endian:"BE"})
  return buffer;
}
net.getSmsConf_t = function() {
  return sms_confg_t.size()
}

var var_temp_conf_t = new struct("var_temp_conf_t", [
    "HeatingHighTemp", struct.float32(),
    "HeatingLowTemp", struct.float32(),
    "HeatingDelatTemp", struct.float32(),
		"CoolingHighTemp", struct.float32(),
    "CoolingLowTemp", struct.float32(),
		"CoolingDelatTemp", struct.float32()
]);
net.makeVarTempConf_t = function(heatingHighTemp, heatingLowTemp, heatingDelatTemp, coolingHighTemp, coolingLowTemp, coolingDelatTemp) {
  var buffer = new Buffer(var_temp_conf_t.size());
  var_temp_conf_t.encode(buffer,0, {
    HeatingHighTemp: heatingHighTemp,
    HeatingLowTemp: heatingLowTemp,
    HeatingDelatTemp: heatingDelatTemp,
		CoolingHighTemp: coolingHighTemp,
    CoolingLowTemp: coolingLowTemp,
		CoolingDelatTemp: coolingDelatTemp
  },{endian:"BE"})
  return buffer;
}
net.getSizeVarTempConf_t = function() {
  return var_temp_conf_t.size()
}

var peak_demand_conf_t = new struct("peak_demand_conf_t", [
    "MaxHeatingRoom", struct.uint32(),
    "NightMaxHeatingRoom", struct.uint32()
]);
net.makePeakDemandConf_t = function(maxHeatingRoom, nightMaxHeatingRoom) {
  var buffer = new Buffer(peak_demand_conf_t.size());
  peak_demand_conf_t.encode(buffer,0, {
    MaxHeatingRoom: maxHeatingRoom,
    NightMaxHeatingRoom: nightMaxHeatingRoom
  },{endian:"BE"})
  return buffer;
}
net.getSizePeakDemandConf_t = function() {
  return peak_demand_conf_t.size()
}

var optimal_stop_conf_t = new struct("optimal_stop_conf_t", [
    "OptimalStopTimeSec", struct.int32()
]);
net.makeOptimalStopConf_t = function(optimalStopTimeSec) {
  var buffer = new Buffer(optimal_stop_conf_t.size());
  optimal_stop_conf_t.encode(buffer,0, {
    OptimalStopTimeSec: optimalStopTimeSec
  },{endian:"BE"})
  return buffer;
}
net.getSizeOptimalStopConf_t = function() {
  return optimal_stop_conf_t.size()
}

var demand_response_conf_t = new struct("demand_response_conf_t", [
    "DRTemp", struct.float32(),
    "DRTimeHour", struct.int32()
]);
net.makeDemandResponseConf_t = function(drTemp, drTimeHour) {
  var buffer = new Buffer(demand_response_conf_t.size());
  demand_response_conf_t.encode(buffer,0, {
    DRTemp: drTemp,
    DRTimeHour: drTimeHour
  },{endian:"BE"})
  return buffer;
}
net.getSizeDemandResponseConf_t = function() {
  return demand_response_conf_t.size()
}

var pre_heating_conf_t = new struct("pre_heating_conf_t", [
    "Option", struct.uint32(),
    "Tout_avg", struct.float32(),
    "WF_Toutdoor", struct.int32(),
    "WF_Tdiff", struct.int32(),
    "IncTempRate", struct.float32(),
    "DecTempRate", struct.float32(),
    "PH_StartTimeErrRange", struct.int32(),
    "PH_LowLoadStartTimeErrRange", struct.int32(),
    "PH_TimeSecBeforeMax1", struct.int32(),
    "CooledRoomTsurf_init", struct.float32(),
    "CooledRoomPHHourInc", struct.float32(),
    "CooledRoomPHHourIncMax", struct.float32(),
    "MaxPreHeatingStartHour", struct.uint32(),
    "ControlPeriodSec", struct.uint32(),
    "LowLoadTimeUseRatio", struct.float32(),
    "OccupiedRoomHeatingRatio", struct.float32(),
    "ReservedRoomHeatingRatio", struct.float32()
]);
net.makePreHeatingConf_t = function(option, tout_avg, wf_Toutdoor, wf_Tdiff, incTempRate, decTempRate, ph_StartTimeErrRange, ph_LowLoadStartTimeErrRange, ph_TimeSecBeforeMax1, cooledRoomTsurf_init, cooledRoomPHHourInc, cooledRoomPHHourIncMax, maxPreHeatingStartHour, controlPeriodSec, lowLoadTimeUseRatio, occupiedRoomHeatingRatio, reservedRoomHeatingRatio) {
  var buffer = new Buffer(pre_heating_conf_t.size());
  pre_heating_conf_t.encode(buffer,0, {
    Option: option,
    Tout_avg: tout_avg,
    WF_Toutdoor: wf_Toutdoor,
    WF_Tdiff: wf_Tdiff,
    IncTempRate: incTempRate,
    DecTempRate: decTempRate,
    PH_StartTimeErrRange: ph_StartTimeErrRange,
    PH_LowLoadStartTimeErrRange: ph_LowLoadStartTimeErrRange,
		PH_TimeSecBeforeMax1: ph_TimeSecBeforeMax1,
    CooledRoomTsurf_init: cooledRoomTsurf_init,
    CooledRoomPHHourInc: cooledRoomPHHourInc,
    CooledRoomPHHourIncMax: cooledRoomPHHourIncMax,
    MaxPreHeatingStartHour: maxPreHeatingStartHour,
    ControlPeriodSec: controlPeriodSec,
    LowLoadTimeUseRatio: lowLoadTimeUseRatio,
    OccupiedRoomHeatingRatio: occupiedRoomHeatingRatio,
    ReservedRoomHeatingRatio: reservedRoomHeatingRatio
  },{endian:"BE"})
  return buffer;
}
net.getSizePreHeatingConf_t = function() {
  return pre_heating_conf_t.size()
}

var notify_conf_t = new struct("notify_conf_t", [
		"NotifyOption", struct.uint32(),
    "NotifyIntervalSec", struct.int32(),
		"NotifyStartHour", struct.int32(),
    "NotifyEndHour", struct.int32()
]);
net.makeNotifyConf_t = function(notifyOption, notifyIntervalSec, notifyStartHour, notifyEndHour) {
  var buffer = new Buffer(notify_conf_t.size());
  notify_conf_t.encode(buffer,0, {
		NotifyOption: notifyOption,
    NotifyIntervalSec: notifyIntervalSec,
		NotifyStartHour: notifyStartHour,
		NotifyEndHour: notifyEndHour
  },{endian:"BE"})
  return buffer;
}
net.getSizeNotifyConf_t = function() {
  return notify_conf_t.size()
}

var floor_rad_conf_t = new struct("floor_rad_conf_t", [
    "ControlOption", struct.uint32(),
    "RoomCnt", struct.int32(),
    "UseTsurf", struct.int32(),
    "Troom_set", struct.float32(),
    "Tsurf_set", struct.float32(),
    "Troom_cr", struct.float32(),
    "Tsurf_cr", struct.float32(),
    "Tctrl_res", struct.float32(),
    "CheckInHour", struct.int32(),
		"RR_StayHour", struct.int32(),
    "TelNumber0", struct.char(12),
    "TelNumber1", struct.char(12),
    "TelNumber2", struct.char(12),
    "TelNumber3", struct.char(12),
    "TelNumber4", struct.char(12),
    "OperationOption", struct.uint32(),
    "Reserved1", struct.uint32(),
    "Reserved2", struct.uint32(),
    "tVariableTemp", var_temp_conf_t,
    "tPeak", peak_demand_conf_t,
    "tOptimalStop", optimal_stop_conf_t,
    "tDemandResponse", demand_response_conf_t,
    "tPreHeating", pre_heating_conf_t,
		"tNotify", notify_conf_t
]);
net.makeFloorRadConf_t = function(controlOption, roomCnt, useTsurf, troom_set, tsurf_set, troom_cr, tsurf_cr, tctrl_res, tsurf_init, tset_init_inc, tset_init_inc_max, checkInHour, rr_CheckInHour, rr_StayHour, telNumber0, telNumber1, telNumber2, telNumber3, telNumber4, operationOption, reserved1, reserved2, tVariableTemp, tPeak, tOptimalStop, tDemandResponse, tPreHeating, tNotify) {
  var buffer = new Buffer(floor_rad_conf_t.size());
  floor_rad_conf_t.encode(buffer,0, {
    ControlOption: controlOption,
    RoomCnt: roomCnt,
    UseTsurf: useTsurf,
    Troom_set: troom_set,
    Tsurf_set: tsurf_set,
    Troom_cr: troom_cr,
    Tsurf_cr: tsurf_cr,
    Tctrl_res: tctrl_res,
    CheckInHour: checkInHour,
    RR_StayHour: rr_StayHour,
		TelNumber0: telNumber0,
		TelNumber1: telNumber1,
		TelNumber2: telNumber2,
		TelNumber3: telNumber3,
		TelNumber4: telNumber4,
		OperationOption: operationOption,
		Reserved1: reserved1,
		Reserved2: reserved2,
    tVariableTemp: tVariableTemp,
    tPeak: tPeak,
    tOptimalStop: tOptimalStop,
    tDemandResponse: tDemandResponse,
    tPreHeating: tPreHeating,
		tNotify: tNotify
  },{endian:"BE"})
  return buffer;
}
net.getSizeFloorRadConf_t = function() {
  return floor_rad_conf_t.size()
}


var damp_control_conf_t = new struct("damp_control_conf_t", [
    "DamperCtrlMode", struct.int32(),
    "Rdamp_set", struct.float32(),
    "Rdamp_min", struct.float32(),
    "Rdamp_max", struct.float32(),
    "Rdamp_ctrl_res", struct.float32(),
		"Rdamp_noctrl_max", struct.float32(),
    "PPMco2_set", struct.int32(),
    "DamperAutoManual", struct.uint32()
]);
net.makeDampControlConf_t = function( damperCtrlMode, rdamp_set, rdamp_min, rdamp_max, rdamp_ctrl_res, rdamp_noctrl_max, ppmCo2_set, damperAutoManual) {
  var buffer = new Buffer(damp_control_conf_t.size());
  damp_control_conf_t.encode(buffer,0, {

    DamperCtrlMode: damperCtrlMode,
    Rdamp_set: rdamp_set,
    Rdamp_min: rdamp_min,
    Rdamp_max: rdamp_max,
    Rdamp_ctrl_res: rdamp_ctrl_res,
    Rdamp_noctrl_max: rdamp_noctrl_max,
    PPMco2_set: ppmCo2_set,
    DamperAutoManual: damperAutoManual
  },{endian:"BE"})
  return buffer;
}
net.getSizeDampControlConf_t = function() {
  return damp_control_conf_t.size()
}

var pid_control_conf_t = new struct("pid_control_conf_t", [
    "PIDCtrlMode", struct.uint32(),
    "ControlStepValue", struct.uint32(),
    "Kp", struct.float32(),
    "Ki", struct.float32(),
    "Kd", struct.float32(),
]);
net.makePidControlConf_t = function( pidCtrlMode, controlStepValue, kp, ki, kd) {
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
net.getSizePidControlConf_t = function() {
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
net.makeCo2Conf_t = function( controlMode, ppmCo2_rate_wf, ppmCo2_wf, ppmCo2_empty, ppmCo2_occupied, ppmCo2_inc_rate, ppmCo2_dec_rate, ppmCo2_inc_time, ppmCo2_dec_time) {
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
net.getSizeCo2Conf_t = function() {
  return co2_conf_t.size()
}

var economizer_cycle_t = new struct("economizer_cycle_t", [
		"Tout", struct.float32(),
    "Hout", struct.float32(),
		"Eout", struct.float32(),
    "Reserved", struct.int32()
]);
net.makeEconomizerCycle_t = function(tout, hout, eout, reserved) {
  var buffer = new Buffer(economizer_cycle_t.size());
  economizer_cycle_t.encode(buffer,0, {
		Tout: tout,
    Hout: hout,
		Eout: eout,
		Reserved: reserved
  },{endian:"BE"})
  return buffer;
}
net.getSizeEconomizerCycle_t = function() {
  return economizer_cycle_t.size()
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
		"NoControlOption", struct.uint32(),
		"SchedulerOption", struct.uint32(),
		"Reserved1", struct.uint32(),
		"Reserved2", struct.uint32(),
    "tRdamp", damp_control_conf_t,
	  "tPID", pid_control_conf_t,
		"tC02Conf", co2_conf_t,
		"tVariableTemp", var_temp_conf_t,
		"tEconomizerCycle", economizer_cycle_t,
		"tNotify", notify_conf_t
]);
net.makeSolbeachConf_t = function(controlOption, zoneCnt, hcMode, tzone_set, tctrl_res, telNumber0, telNumber1, telNumber2, telNumber3, telNumber4, co2LoadPeriodSec, noControlOption, schedulerOption, reserved1, reserved2, tRdamp, tPID, tC02Conf, tVariableTemp, tEconomizerCycle, tNotify) {
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
		NoControlOption: noControlOption,
		SchedulerOption: schedulerOption,
		Reserved1: reserved1,
		Reserved2: reserved2,
    tRdamp: tRdamp,
    tPID: tPID,
    tC02Conf: tC02Conf,
    tVariableTemp: tVariableTemp,
		tEconomizerCycle: tEconomizerCycle,
		tNotify: tNotify
  },{endian:"BE"})
  return buffer;
}
net.getSizeSolbeachConf_t = function() {
  return solbeach_conf_t.size()
}

var ems_sys_config_t = new struct("ems_sys_config_t", [
    "PacketMinIntervalSec", struct.uint32(),
    "ControlPeriodSec", struct.uint32(),
    "tAddr", address_conf_t,
    "tLog", log_conf_t,
		"tDataBase", db_confg_t,
		"tSMS", sms_confg_t,
		"DummyPktPeriod", struct.uint32(),
	  "ReservedOption1", struct.uint32(),
		"ReservedOption2", struct.uint32(),
		"SiteInfo", struct.uint16(),
    "tRemoteAddr", address_conf_t,
    "tFloorRadConf", floor_rad_conf_t,
    "tSolBeachConf", solbeach_conf_t
]);

net.makeEmsSysConf_t = function(packetMinIntervalSec, controlPeriodSec, tAddr, tLog, tDataBase, tSMS, dummyPktPeriod, reservedOption1, reservedOption2, siteInfo, tRemoteAddr, tFloorRadConf, tSolBeachConf) {
  var buffer = new Buffer(ems_sys_config_t.size());
  ems_sys_config_t.encode(buffer,0, {
    PacketMinIntervalSec: packetMinIntervalSec,
    ControlPeriodSec: controlPeriodSec,
    tAddr: tAddr,
    tLog: tLog,
    tDataBase: tDataBase,
    tSMS: tSMS,
		DummyPktPeriod: dummyPktPeriod,
		ReservedOption1: reservedOption1,
		ReservedOption2: reservedOption2,
		SiteInfo: siteInfo,
    tRemoteAddr: tRemoteAddr,
    tFloorRadConf: tFloorRadConf,
    tSolBeachConf: tSolBeachConf
  },{endian:"LE"})
  return buffer;
}
net.getSizeEmsSysConf_t = function() {
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
net.makeControlData_t = function(packetMinIntervalSec, moduleIndex, module_, setPoint, fValue, dataLen) {
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
net.getSizeControlData_t = function() {
  return control_data_t.size()
}

var oam_msg_t = new struct("oam_msg_t", [
    "OAMMsgType", struct.uint16(),
    "DataLen", struct.uint16(),
    "Data", struct.uint32(2)
]);
net.makeOamMsg_t = function(oamMsgType, dataLen, data) {
  var buffer = new Buffer(oam_msg_t.size());
  oam_msg_t.encode(buffer,0, {
    OAMMsgType: oamMsgType,
    DataLen: dataLen,
    Data: data
  },{endian:"BE"})
  return buffer;
}
net.getSizeOamMsg_t = function() {
  return oam_msg_t.size()
}

var manual_heating_t = new struct("manual_heating_t", [
    "RoomNo", struct.uint16(),
    "HeatingMode", struct.uint16(),
    "HeatingTimeSec", struct.int32(),
    "Tset", struct.float32(),
    "Tset_cr", struct.float32()
]);
net.makeManualHeating_t = function(roomNo, heatingMode, heatingTimeSec, tset, tset_cr) {
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
net.getSizeManualHeating_t = function() {
  return manual_heating_t.size()
}

var room_config_t = new struct("room_config_t", [
    "RoomNo", struct.uint16(),
    "Area", struct.uint8(),
    "Direction", struct.uint8(),
    "ExteriorWallCnt", struct.uint8(),
		"Priority", struct.uint8(),
    "Troom_set", struct.float32(),
    "Tsurf_set", struct.float32(),
    "Troom_cr", struct.float32(),
    "Tsurf_cr", struct.float32(),
    "szDesc", struct.char(32)
]);
net.makeRoomConfig_t = function(roomNo, area, direction, exteriorWallCnt, priority, troom_set, tsurf_set, troom_cr, tsurf_cr, checkInOutEnable, checkInTime, checkOutTime, szDesc) {
  var buffer = new Buffer(room_config_t.size());
  room_config_t.encode(buffer,0, {
    RoomNo: roomNo,
    Area: area,
    Direction: direction,
    ExteriorWallCnt: exteriorWallCnt,
		Priority: priority,
    Troom_set: troom_set,
    Tsurf_set: tsurf_set,
    Troom_cr: troom_cr,
    Tsurf_cr: tsurf_cr,
    szDesc: szDesc
  },{endian:"BE"})
  return buffer;
}
net.getSizeRoomConfig_t = function() {
  return room_config_t.size()
}


var ahu_zone_config_msg_t = new struct("ahu_zone_config_msg_t", [
	"AhuIndex", struct.uint16(),
	"NotifyOccupantsState", struct.uint8(),
	"EconomizerCycle", struct.uint8(),
	"VarTempControl", struct.int8(),
	"HCMode", struct.int8(),
	"FanAutoManual", struct.int8(),
	"DamperAutoManual", struct.int8(),
	"Tzone_set", struct.float32(),
	"Rdamp_set", struct.float32(),
	"PPMco2_set", struct.int32(),
	"Desc", struct.char(32)
]);
net.makeAhuZoneConfigMsg_t = function(ahuIndex, notifyOccupantsState, economizerCycle, varTempControl, hcMode, fanAutoManual, damperAutoManual, tzone_set, rdamp_set, ppmCo2_set, desc) {
  var buffer = new Buffer(ahu_zone_config_msg_t.size());
  ahu_zone_config_msg_t.encode(buffer,0, {
    AhuIndex: ahuIndex,
    NotifyOccupantsState: notifyOccupantsState,
    EconomizerCycle: economizerCycle,
		VarTempControl: varTempControl,
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
net.getSizeAhuZoneConfigMsg_t = function() {
  return ahu_zone_config_msg_t.size()
}

var ahu_zone_config_t = new struct("ahu_zone_config_t", [
    "AhuIndex", struct.uint16(),
		"UseScheduler", struct.uint8(),
    "NotifyOccupantsState", struct.uint8(),
		"EconomizerCycle", struct.uint8(),
		"VarTempControl", struct.char(),
    "HCMode", struct.char(),
		"FanAutoManual", struct.char(),
    "DamperAutoManual", struct.char(),
    "Tzone_set", struct.float32(),
    "Rdamp_set", struct.float32(),
    "PPMco2_set", struct.int32(),
    "Desc", struct.char(32)
]);
net.makeAhuZoneConfig_t = function(ahuIndex, useScheduler, notifyOccupantsState, economizerCycle, varTempControl, hcMode, fanAutoManual, damperAutoManual, tzone_set, rdamp_set, ppmCo2_set, desc) {
  var buffer = new Buffer(ahu_zone_config_t.size());
  ahu_zone_config_t.encode(buffer,0, {
    AhuIndex: ahuIndex,
		UseScheduler: useScheduler,
    NotifyOccupantsState: notifyOccupantsState,
    EconomizerCycle: economizerCycle,
		VarTempControl: varTempControl,
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
net.getSizeAhuZoneConfig_t = function() {
  return ahu_zone_config_t.size()
}

var damper_scheduler_t = new struct("damper_scheduler_t", [
    "Hour", struct.uint8(),
    "Min", struct.uint8(),
		"DamperAM", struct.int8(),
		"DamperRun", struct.int8(),
    "DamperRatio", struct.uint8(),
		"FanAM", struct.int8(),
		"FanRun", struct.int8(),
		"Tset", struct.float32(),
		"Economizer", struct.uint8(),
]);
net.makeDamperScheduler_t = function(hour, min, damperAM, damperRun, damperRatio, fanAM, fanRun, tSet, economizer) {
  var buffer = new Buffer(damper_scheduler_t.size());
  damper_scheduler_t.encode(buffer,0, {
    Hour: hour,
    Min: min,
    DamperAM: damperAM,
    DamperRun: damperRun,
    DamperRatio: damperRatio,
    FanAM: fanAM,
    FanRun: fanRun,
    Tset: tSet,
    Economizer: economizer
  },{endian:"BE"})
  return buffer;
}
net.getSizeDamperScheduler_t = function() {
  return damper_scheduler_t.size()
}

var damper_scheduler_config_t = new struct("damper_scheduler_t", [
    "AhuIndex", struct.uint16(),
    "Reserved", struct.uint16(),
    "tSch", struct.type(damper_scheduler_t, 12)
]);
net.makeDamperSchedulerConfig_t = function(ahuIndex, reserved, tSch) {
  var buffer = new Buffer(damper_scheduler_config_t.size());
  damper_scheduler_config_t.encode(buffer,0, {
    AhuIndex: ahuIndex,
    Reserved: reserved,
    tSch: tSch
  },{endian:"BE"})
  return buffer;
}
net.getSizeDamperSchedulerConfig_t = function() {
  return damper_scheduler_config_t.size()
}

var check_in_cmd_t = new struct("check_in_cmd_t", [
	"RoomNo", struct.uint16(),
	"CheckInOutEnable", struct.uint16(),
	"CheckIn", struct.uint32(),
	"CheckOut", struct.uint32(),
]);
net.makeCheckInCmd_t = function(roomNo, checkInOutEnable, checkIn, checkOut) {
  var buffer = new Buffer(check_in_cmd_t.size());
  check_in_cmd_t.encode(buffer,0, {
    RoomNo: roomNo,
    CheckInOutEnable: checkInOutEnable,
    CheckIn: checkIn,
    CheckOut: checkOut
  },{endian:"BE"})
  return buffer;
}
net.getSizeCheckIn_t = function() {
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
net.makeEmsAlarm_t = function(ulTime, usSeq, usSiteInfo, usModule, usLevel, usModuleIndex, szContent) {
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
net.getSizeEmsAlarm_t = function() {
  return ems_alarm_t.size()
}

var floor_rad_room_state_t = new struct("floor_rad_room_state_t", [
    "RoomNo", struct.uint16(),
    "HeatingMode", struct.uint16(),
    "RoomState", struct.uint8(),
    "ReservedRoomType", struct.uint8(),
    "ReservedRoomHour", struct.uint8(),
    "CheckInOutEnable", struct.uint8(),
    "CheckInTime", struct.int32(),
    "CheckOutTime", struct.int32(),
    "Tset", struct.float32(),
    "Tcr", struct.float32(),
		"MH_SchedulerUsed", struct.uint8(),
    "reserved", struct.uint8(3),
    "MH_HeatingTimeSec", struct.int32(),
    "MH_HeatingStopTimeSec", struct.int32(),
    "MH_TotalHeatingTimeSec", struct.int32(),
    "MH_TodayStartTime", struct.int32(),
    "MH_Tset", struct.float32(),
    "MH_Tcr", struct.float32(),
    "PreHeatingOption", struct.uint32(),
    "OptimalNeedTime", struct.int32(),
    "PreHeatingStartTime", struct.int32(),
    "MH_StartTime", struct.int32(),
    "MH_EndTime", struct.int32(),
    "MH_HeatingLeftTime", struct.int32(),
    "TempInc", struct.float32(),
    "TempDec", struct.float32(),
    "Troom_cur", struct.float32(),
    "Tsurf_cur", struct.float32()
]);
net.makeFloorRadRoomState_t = function(	roomNo, heatingMode, roomState, reservedRoomType, reservedRoomHour, checkInOutEnable, checkInTime, checkOutTime, tSet, tCr, mh_SchedulerUsed, reserved, mh_HeatingTimeSec, mh_HeatingStopTimeSec, mh_TotalHeatingTimeSec, mh_TodayStartTime, mh_Tset, mh_Tcr, preHeatingOption, optimalNeedTime, preHeatingStartTime, mh_StartTime, mh_EndTime, mh_HeatingLeftTime, tempInc, tempDec, tRoom_cur, tSurf_cur) {
  var buffer = new Buffer(floor_rad_room_state_t.size());
  floor_rad_room_state_t.encode(buffer,0, {
		RoomNo: roomNo,
    HeatingMode: heatingMode,
    RoomState: roomState,
    ReservedRoomType: reservedRoomType,
    ReservedRoomHour: reservedRoomHour,
    CheckInOutEnable: checkInOutEnable,
    CheckInTime: checkInTime,
    CheckOutTime: checkOutTime,
    Tset: tSet,
    Tcr: tCr,
		MH_SchedulerUsed: mh_SchedulerUsed,
    reserved: reserved,
    MH_HeatingTimeSec: mh_HeatingTimeSec,
    MH_HeatingStopTimeSec: mh_HeatingStopTimeSec,
    MH_TotalHeatingTimeSec: mh_TotalHeatingTimeSec,
    MH_TodayStartTime: mh_TodayStartTime,
    MH_Tset: mh_Tset,
    MH_Tcr: mh_Tcr,
    PreHeatingOption: preHeatingOption,
    OptimalNeedTime: optimalNeedTime,
    PreHeatingStartTime: preHeatingStartTime,
    MH_StartTime: mh_StartTime,
    MH_EndTime: mh_EndTime,
    MH_HeatingLeftTime: mh_HeatingLeftTime,
    TempInc: tempInc,
    TempDec: tempDec,
    Troom_cur: tRoom_cur,
    Tsurf_cur: tSurf_cur,
  },{endian:"BE"})
  return buffer;
}
net.getSizeFloorRadRoomState = function() {
  return floor_rad_room_state_t.size()
}

var room_priority_t = new struct("room_priority_t", [
	"RoomNo", struct.uint16(),
	"Priority", struct.uint8(),
	"Reserved", struct.uint8()
]);
net.makeRoomPrioritiy_t = function(roomNo, priority, reserved) {
  var buffer = new Buffer(room_priority_t.size());
  room_priority_t.encode(buffer,0, {
    RoomNo: roomNo,
    Priority: priority,
    Reserved: reserved
  },{endian:"BE"})
  return buffer;
}
net.getSizeRoomPrioritiy_t = function() {
  return room_priority_t.size()
}

var floor_rad_room_priority_t = new struct("floor_rad_room_priority_t", [
	"tPriority", struct.type(room_priority_t, MAX_ROOM_CNT)
]);
net.makeFloorRadRoomPrioritiy_t = function(tPriority) {
  var buffer = new Buffer(floor_rad_room_priority_t.size());
  floor_rad_room_priority_t.encode(buffer,0, {
    tPriority: tPriority
  },{endian:"BE"})
  return buffer;
}
net.getSizeFloorRadRoomPrioritiy_t = function() {
  return floor_rad_room_priority_t.size()
}
// typedef struct
// {
// 	u16		RoomNo;				// room number
// 	u8		Priority;			// Priority
// 	u8		Reserved;
// } room_prioriy_t;
//
//
// typedef struct
// {
// 	room_prioriy_t tPriority[MAX_ROOM_CNT];
// } floor_rad_room_priority_t;

module.exports = net;

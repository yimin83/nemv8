var express = require('express');
var router = express.Router();
var mysqlDB = require('./../../mysql-db');
var net = require('./../socketOutput');
const counter = require('./../makeSeq.js');
var EMS_ID = 'NB_ADMIN'
var EMS_PASSWORD = 'FLOWERSTONE_81'
var UserLevel = 1
var _ems_web_client = 0x81
var EMS_VERSION = 0x0101
var EMS_PREAMBLE = 0x1B04
var Msg_Type_Auth = 0x10
var Msg_Type_OAM = 0x60
var Msg_Status_OK = 0
var web_interface = 0x80

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

mysqlDB.connect();
var client = net.getConnection();
/* GET home page. */

var nSeq = counter.get()
var totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeEmsAuthReq_t()
var msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_Auth, Msg_Status_OK);
var msgBuffer = net.makeEmsAuthReq_t(EMS_ID, EMS_PASSWORD, UserLevel, web_interface);
var fullBuffer = new Buffer(totalSize);
msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeEmsAuthReq_t());
net.writeData(client, fullBuffer, null);

var dataLen = 0
var IntervalA;
// const startCallback = Date.now();
// while (Date.now() - startCallback < 10000) {
// }
var roomsArr = [];
var makeRsvRoomsArr = function () {
	mysqlDB.query("SELECT * FROM floor_rad_room;", function(err, result, fields){
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
			if(result!=null){
				for(var i=0;i<result.length;i++){
					roomsArr.push({usRoomNo:result[i].usRoomNo,nCheckInOutEnable:result[i].nCheckInOutEnable,nCheckInTime:result[i].nCheckInTime,nCheckOutTime:result[i].nCheckOutTime})
				}
			}
		}
  });
	console.log(roomsArr.length)
	// console.log(roomsArr)
}
var clearRsvRoomsArr = function (usRoomNo){
	console.log("################ clearRsvRooms start!!! ################")
	for(var i=0;i<roomsArr.length;i++){
		if(usRoomNo == roomsArr[i].usRoomNo){
			roomsArr[i].nCheckInOutEnable = 0
			roomsArr[i].nCheckInTime = 0
			roomsArr[i].nCheckOutTime = 0
			break;
		}
	}
}

var refreshRsvRoomsArr = function (result){
	console.log("################ refreshRsvRoomsArr start!!! ################")
	for(var i=0;i<roomsArr.length;i++){
		if(result.usRoomNo == roomsArr[i].usRoomNo){
			roomsArr[i].nCheckInOutEnable = result.nCheckInOutEnable
			roomsArr[i].nCheckInTime = result.nCheckInTime
			roomsArr[i].nCheckOutTime = result.nCheckOutTime
			break;
		}
	}
}

var refreshRsvRooms = function (){
	console.log("################ refreshRsvRooms start!!! ################")
	for(var i=0;i<roomsArr.length;i++){
		mysqlDB.query("SELECT * FROM roomsschedule where usRoomNo = ? ORDER BY nCheckInTime asc limit 1;", [roomsArr[i].usRoomNo], function(err, result, fields){
	    if(err){
	      console.log("쿼리문에 오류가 있습니다. err : " + err);
	    }
	    else{
				if(result.length != 0  ){
					console.log("################ refreshRsvRooms result not zero ################ : " + JSON.stringify(result[0]))
					refreshRsvRoomsArr(result[0])
				}
			}
	  });
	}
}
var processRsvRoom = function(result){
	console.log("########################## processRsvRoom ##################### usRoomNo : " + result.usRoomNo)
	for(var i=0;i<roomsArr.length;i++){
		//console.log("################ processRsvRoom start!!! ################ : "+roomsArr[i].usRoomNo+", roomsArr[i].nCheckInTime : " + roomsArr[i].nCheckInTime +", result.nCheckInTime : " + result.nCheckInTime )
		if(roomsArr[i].usRoomNo == result.usRoomNo && ((roomsArr[i].nCheckInTime == 0) || (roomsArr[i].nCheckInTime > result.nCheckInTime))) {
			console.log("################ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " )
			roomsArr[i].nCheckInOutEnable = result.nCheckInOutEnable
			roomsArr[i].nCheckInTime = result.nCheckInTime
			roomsArr[i].nCheckOutTime = result.nCheckOutTime
			var dataBuffer = new Buffer(net.getSizeCheckIn_t())
			dataBuffer = net.makeCheckInCmd_t(result.usRoomNo, result.nCheckInOutEnable, result.nCheckInTime, result.nCheckOutTime);
			dataLen = net.getSizeCheckIn_t();
			msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_cmd_checkIn, dataLen, null);
			totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
			nSeq = counter.get();
			msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
			fullBuffer = new Buffer(totalSize);
			msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
			msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
			dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t()+net.getSizeOamMsg_t()), 0, dataLen);
			net.writeData(client, fullBuffer, nSeq);
			break;
		}
	}
}
var checkRsvRoomsArr = function (){
	console.log("################ checkRsvRoomsArr start!!! ################")
	for(var i=0;i<roomsArr.length;i++){
		mysqlDB.query("SELECT * FROM roomsschedule where usRoomNo = ? ORDER BY nCheckInTime asc limit 1;", [roomsArr[i].usRoomNo], function(err, result, fields){
	    if(err){
	      console.log("쿼리문에 오류가 있습니다. err : " + err);
	    }
	    else{
				if(result.length != 0  ){
					console.log("################ checkRsvRoomsArr result not zero ################ : " + JSON.stringify(result[0]))
					processRsvRoom(result[0])
				}
				else{
					// console.log('########### checkRsvRoomsArr result zero !!!')
					return null
				}
			}
	  });
	}
}

var getRecentCheckInTime = function (usRoomNo){
	console.log("################ getRecentCheckInTime start!!! ################")
	mysqlDB.query("SELECT * FROM roomsschedule where usRoomNo = ? ORDER BY ABS( DATEDIFF( nCheckInTime, NOW() ) ) LIMIT 1;", [usRoomNo, ], function(err, result, fields){
    if(err){
      console.log("쿼리문에 오류가 있습니다. err : " + err);
    }
    else{
			if(result != null){
				console.log('########### getRecentCheckInTime usRoomNo : '+ usRoomNo+ ', result : '+result+', JSON.stringify(result) : ' + JSON.stringify(result))
				return JSON.stringify(result)
			}
			else{
				console.log('########### getRecentCheckInTime null!!!')
				return null
			}
		}
  });
}
makeRsvRoomsArr();
setInterval(checkRsvRoomsArr, 5000);
const seqMap = new Map()
router.get('/', function(req, res, next) {
  mysqlDB.query("SELECT * FROM floor_rad_room;", function(err, result, fields){
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      res.json(result);
      //console.log(result)
    }
  });
});

router.get('/emsSysConfig', function(req, res, next) {
  dataLen = 0;
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_sys_config, dataLen, null);
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
  nSeq = counter.get();
  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
  fullBuffer = new Buffer(totalSize);
  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
  net.writeData(client, fullBuffer, nSeq);
  IntervalA = setInterval(checkMap, 1000, nSeq, res);
});

router.put('/emsSysConfig', (req, res, next) => { // 수정
	//console.log("emsSysConfig req.body.configs : " + JSON.stringify(req.body.configs) + ", PacketMinIntervalSec : " + req.body.configs.PacketMinIntervalSec)
	var dataBuffer = new Buffer(net.getSizeEmsSysConf_t())
	dataBuffer = net.makeEmsSysConf_t(
		req.body.configs.PacketMinIntervalSec, req.body.configs.ControlPeriodSec,
		{IpAddress:req.body.configs.tAddr.IpAddress, EMSPortNo:req.body.configs.tAddr.EMSPortNo},
		{LogOption:req.body.configs.tLog.LogOption, LogDir:req.body.configs.tLog.LogDir, StatFileName:req.body.configs.tLog.StatFileName,
			LogFileName:req.body.configs.tLog.LogFileName, DBFileName:req.body.configs.tLog.DBFileName, LogPeriod:req.body.configs.tLog.LogPeriod,
			StatPeriod:req.body.configs.tLog.StatPeriod, DBStatPeriod:req.body.configs.tLog.DBStatPeriod},
		{IpAddress:req.body.configs.tRemoteAddr.IpAddress, EMSPortNo:req.body.configs.tRemoteAddr.EMSPortNo},
		{ControlOption:req.body.configs.tFloorRadConf.ControlOption, RoomCount:req.body.configs.tFloorRadConf.RoomCount,
			UseTsurf:req.body.configs.tFloorRadConf.UseTsurf, Troom_set:req.body.configs.tFloorRadConf.Troom_set,
			Tsurf_set:req.body.configs.tFloorRadConf.Tsurf_set, Troom_cr:req.body.configs.tFloorRadConf.Troom_cr,
			Tsurf_cr:req.body.configs.tFloorRadConf.Tsurf_cr, Tctrl_res:req.body.configs.tFloorRadConf.Tctrl_res,
			TelNumber0:req.body.configs.tFloorRadConf.TelNumber0, TelNumber1:req.body.configs.tFloorRadConf.TelNumber1,
			TelNumber2:req.body.configs.tFloorRadConf.TelNumber2, TelNumber3:req.body.configs.tFloorRadConf.TelNumber3,
			TelNumber4:req.body.configs.tFloorRadConf.TelNumber4,
			tVariableTemp:{
				HeatingHighTemp:req.body.configs.tFloorRadConf.tVariableTemp.HeatingHighTemp,
				HeatingLowTemp:req.body.configs.tFloorRadConf.tVariableTemp.HeatingLowTemp,
				HeatingDelatTemp:req.body.configs.tFloorRadConf.tVariableTemp.HeatingDelatTemp,
				LowCoolingTemp:req.body.configs.tFloorRadConf.tVariableTemp.LowCoolingTemp},
			tPeak:{
				MaxHeatingRoom:req.body.configs.tFloorRadConf.tPeak.MaxHeatingRoom,
				NightMaxHeatingRoom:req.body.configs.tFloorRadConf.tPeak.NightMaxHeatingRoom},
			tOptimalStop:{
				OptimalStopTimeSec:req.body.configs.tFloorRadConf.tOptimalStop.OptimalStopTimeSec},
			tDemandResponse:{
				DRTemp:req.body.configs.tFloorRadConf.tDemandResponse.DRTemp,
				DRTimeHour:req.body.configs.tFloorRadConf.tDemandResponse.DRTimeHour},
			tPreHeating:{
				Option:req.body.configs.tFloorRadConf.tPreHeating.Option,
				Tout_avg:req.body.configs.tFloorRadConf.tPreHeating.Tout_avg,
				WF_Toutdoor:req.body.configs.tFloorRadConf.tPreHeating.WF_Toutdoor,
				WF_Tdiff:req.body.configs.tFloorRadConf.tPreHeating.WF_Tdiff,
				IncTempRate:req.body.configs.tFloorRadConf.tPreHeating.IncTempRate,
				DecTempRate:req.body.configs.tFloorRadConf.tPreHeating.DecTempRate}
			},
			{ ControlOption:req.body.configs.tSolBeachConf.ControlOption, ZoneCnt:req.body.configs.tSolBeachConf.ZoneCnt,
				HCMode:req.body.configs.tSolBeachConf.HCMode, Tzone_set:req.body.configs.tSolBeachConf.Tzone_set,
				Tctrl_res:req.body.configs.tSolBeachConf.Tctrl_res, TelNumber0:req.body.configs.tSolBeachConf.TelNumber0,
				TelNumber1:req.body.configs.tSolBeachConf.TelNumber1, TelNumber2:req.body.configs.tSolBeachConf.TelNumber2,
				TelNumber3:req.body.configs.tSolBeachConf.TelNumber3, TelNumber4:req.body.configs.tSolBeachConf.TelNumber4,
				tRdamp:{
					DamperCtrlMode:req.body.configs.tSolBeachConf.tRdamp.DamperCtrlMode,
					Rdamp_set:req.body.configs.tSolBeachConf.tRdamp.Rdamp_set,
					Rdamp_min:req.body.configs.tSolBeachConf.tRdamp.Rdamp_min,
					Rdamp_max:req.body.configs.tSolBeachConf.tRdamp.Rdamp_max,
					Rdamp_ctrl_res:req.body.configs.tSolBeachConf.tRdamp.Rdamp_ctrl_res,
					NotifyIntervalSec:req.body.configs.tSolBeachConf.tRdamp.NotifyIntervalSec,
					PPMco2_set:req.body.configs.tSolBeachConf.tRdamp.PPMco2_set,
					DamperAutoManual:req.body.configs.tSolBeachConf.tRdamp.DamperAutoManual,
					NotifyStartHour:req.body.configs.tSolBeachConf.tRdamp.NotifyStartHour,
					NotifyEndHour:req.body.configs.tSolBeachConf.tRdamp.NotifyEndHour},
				tPID:{
					PIDCtrlMode:req.body.configs.tSolBeachConf.tPID.PIDCtrlMode,
					ControlStepValue:req.body.configs.tSolBeachConf.tPID.ControlStepValue,
					Kp:req.body.configs.tSolBeachConf.tPID.Kp,
					Ki:req.body.configs.tSolBeachConf.tPID.Ki,
					Kd:req.body.configs.tSolBeachConf.tPID.Kd},
				tC02Conf:{
					ControlMode:req.body.configs.tSolBeachConf.tC02Conf.ControlMode,
					PPMco2_rate_wf:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_rate_wf,
					PPMco2_empty:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_empty,
					PPMco2_occupied:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_occupied,
					PPMco2_inc_rate:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_inc_rate,
					PPMco2_dec_rate:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_dec_rate,
					PPMco2_inc_time:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_inc_time,
					PPMco2_dec_time:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_dec_time}
				}
	);
	//console.log(dataBuffer.toString('hex'))
	dataLen = net.getSizeEmsSysConf_t();
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_sys_config, dataLen, null);
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
	nSeq = counter.get();
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
	fullBuffer = new Buffer(totalSize);
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t()+net.getSizeOamMsg_t()), 0, dataLen);
	net.writeData(client, fullBuffer, nSeq);
	res.send({ success: true })
});


router.get('/ahusConfig', function(req, res, next) {
	console.log("################## ahusConfig!!!!")
  mysqlDB.query("SELECT * FROM ahu_info;", function(err, result, fields){
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      res.json(result);
      //console.log(result)
    }
  });
});

router.get('/ahusConfig/:ahuIndex', function(req, res, next) {
  const ahuIndex = req.params.ahuIndex
  var dataBuffer = new Buffer(4)
  dataBuffer.writeUInt32LE(ahuIndex);
  console.log("ahuIndex : "+ahuIndex+", dataBuffer : " + dataBuffer.toString('hex'))
  dataLen = 0;
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_solBeach_zone_config, dataLen, dataBuffer);
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
  nSeq = counter.get();
  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
  fullBuffer = new Buffer(totalSize);
  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
  net.writeData(client, fullBuffer, nSeq);
  IntervalA = setInterval(checkMap, 1000, nSeq, res);
});

router.put('/ahusConfig', (req, res, next) => { // 수정
	console.log("ahusConfig req.body.config : " + JSON.stringify(req.body.config))
	var dataBuffer = new Buffer(net.getSizeAhuZoneConfig_t())
	dataBuffer = net.makeAhuZoneConfigMsg_t(
		req.body.config.AhuIndex, req.body.config.NotifyOccupantsState,
		req.body.config.HCMode, req.body.config.FanAutoManual,
		req.body.config.DamperAutoManual, req.body.config.Tzone_set,
		req.body.config.Rdamp_set, req.body.config.PPMco2_set, req.body.config.Desc
	);
	console.log(dataBuffer.toString('hex'))
	dataLen = net.getSizeAhuZoneConfig_t();
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_solBeach_zone_config, dataLen, null);
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
	nSeq = counter.get();
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
	fullBuffer = new Buffer(totalSize);
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t()+net.getSizeOamMsg_t()), 0, dataLen);
	net.writeData(client, fullBuffer, nSeq);
	res.send({ success: true })
});

router.get('/damperConfig/:ahuIndex', function(req, res, next) {
  const ahuIndex = req.params.ahuIndex
  var dataBuffer = new Buffer(4)
  dataBuffer.writeUInt32LE(ahuIndex);
  console.log("ahuIndex : "+ahuIndex+", dataBuffer : " + dataBuffer.toString('hex'))
  dataLen = 0;
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_solBeach_damper_scheduler, dataLen, dataBuffer);
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
  nSeq = counter.get();
  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
  fullBuffer = new Buffer(totalSize);
  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
  net.writeData(client, fullBuffer, nSeq);
  IntervalA = setInterval(checkMap, 1000, nSeq, res);
});

router.put('/damperConfig', (req, res, next) => { // 수정
	console.log("damperConfig req.body.damperConfig : " + JSON.stringify(req.body.damperConfig))
	var dataBuffer = new Buffer(net.getSizeDamperSchedulerConfig_t())
	// "Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},
	dataBuffer = net.makeDamperSchedulerConfig_t(
		req.body.damperConfig.AhuIndex, req.body.damperConfig.Reserved, req.body.damperConfig.tSch
	);
	console.log("damperConfig : " + dataBuffer.toString('hex'))
	dataLen = net.getSizeDamperSchedulerConfig_t();
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_solBeach_damper_scheduler, dataLen, null);
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
	nSeq = counter.get();
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
	fullBuffer = new Buffer(totalSize);
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t()+net.getSizeOamMsg_t()), 0, dataLen);
	net.writeData(client, fullBuffer, nSeq);
	res.send({ success: true })
});


router.put('/cmdManualHeating', (req, res, next) => { // 수정
	console.log("cmdManualHeating  values : " + req.body.RoomNo + ", "+ req.body.HeatingMode + ", "+ req.body.HeatingTimeSec + ", "+ req.body.Tset + ", "+ req.body.Tset_cr)
	var dataBuffer = new Buffer(net.getSizeDamperSchedulerConfig_t())
	// "Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},
	dataBuffer = net.makeManualHeating_t(
		req.body.RoomNo, req.body.HeatingMode, req.body.HeatingTimeSec, req.body.Tset, req.body.Tset_cr
	);
	console.log("cmdManualHeating : " + dataBuffer.toString('hex'))
	dataLen = net.getSizeManualHeating_t();
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_cmd_floorRad_manual_heating, dataLen, null);
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
	nSeq = counter.get();
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
	fullBuffer = new Buffer(totalSize);
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t()+net.getSizeOamMsg_t()), 0, dataLen);
	net.writeData(client, fullBuffer, nSeq);
	res.send({ success: true })
});

var checkMap = function(seq, res) {
  console.log("######################### checkMap ######################### ")
  var json = seqMap.get(seq)
  if(json != "" && json != null){
    clearInterval(IntervalA)
    res.json(seqMap.get(nSeq))
    console.log("configSetting seqMap.get(nSeq) : " + seqMap.get(nSeq))
    seqMap.delete(nSeq)
  }
}
router.get('/:usRoomNo', (req, res, next) => { // 수정
  const usRoomNo = req.params.usRoomNo
	console.log("get room schedule : " + usRoomNo)
    mysqlDB.query("SELECT * FROM RoomsSchedule where usRoomNo = ?;", [usRoomNo], function(err, result, fields){
      if(err){
        console.log("쿼리문에 오류가 있습니다.");
      }
      else{
        res.json(result);
        //console.log(result)
      }
    });
});
router.get('/getRoomConfig/:roomNo', (req, res, next) => { // 수정
  const roomNo = req.params.roomNo
  console.log("######################### getRoomConfig ######################### ")
  var dataBuffer = new Buffer(2)
  dataBuffer.writeUInt16LE(roomNo);
  console.log("roomNo : "+roomNo+", dataBuffer : " + dataBuffer.toString('hex') )
  dataLen = 0;
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_floorRad_room_config, dataLen, dataBuffer);
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
  nSeq = counter.get();
  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
  fullBuffer = new Buffer(totalSize);
  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
  net.writeData(client, fullBuffer, nSeq);
  IntervalA = setInterval(checkMap, 1000, nSeq, res);
});

router.post('/', (req, res, next) => { // 생성
  console.log('post body : '+ JSON.stringify(req.body))
  const {usRoomNo, nCheckInOutEnable, nCheckInTime, nCheckOutTime, szSubsName, szSubsTel, tReserveDate, ucPeopleCnt, szDesc, Area, Direction, ExteriorWallCnt, Troom_set, Tsurf_set, Troom_cr, Tsurf_cr} = req.body
  mysqlDB.query("INSERT INTO RoomsSchedule (nIdx, usRoomNo, nCheckInOutEnable, nCheckInTime, nCheckOutTime, szSubsName, szSubsTel, tReserveDate, ucPeopleCnt, szDesc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  [ null, usRoomNo, (nCheckInOutEnable==true?1:0), nCheckInTime, nCheckOutTime, szSubsName, szSubsTel, tReserveDate, ucPeopleCnt, szDesc], function (err, rows, fields) {
    if (err) {
        res.send('error : ' + err);
        console.log(err)
    }
  });
	refreshRsvRooms()
	var tmpnCheckInOutEnable
	var tmpnCheckInTime
	var tmpnCheckOutTime
	for(var i=0; i<roomsArr.length; i++) {
		if(roomsArr[i].usRoomNo == usRoomNo) {
			tmpnCheckInOutEnable = roomsArr[i].nCheckInOutEnable
			tmpnCheckInTime = roomsArr[i].nCheckInTime
			tmpnCheckOutTime = roomsArr[i].nCheckOutTime
		}
	}
	var dataBuffer = new Buffer(net.getSizeRoomConfig_t())
	dataBuffer = net.makeRoomConfig_t(usRoomNo, Area, Direction, ExteriorWallCnt, Troom_set, Tsurf_set, Troom_cr, Tsurf_cr, tmpnCheckInOutEnable, tmpnCheckInTime, tmpnCheckOutTime, szDesc);
	dataLen = net.getSizeRoomConfig_t();
	msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_floorRad_room_config, dataLen, dataBuffer);
	totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
	nSeq = counter.get();
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
	fullBuffer = new Buffer(totalSize);
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t()+net.getSizeOamMsg_t()), 0, dataLen);
	net.writeData(client, fullBuffer, nSeq);
	res.send({ success: true })
});
router.put('/:type', (req, res, next) => { // 수정
  const type = req.params.type
  console.log('############ roomConfig type : ' + type + 'body : '+ JSON.stringify(req.body))
  if(type == "roomStat"){
    const { RoomNo, Area, Direction, ExteriorWallCnt, Troom_set, Tsurf_set, Troom_cr, Tsurf_cr, CheckInOutEnable,
			CheckInTime, CheckOutTime, szDesc, HeatingMode, HeatingTimeSec, Tset, Tset_cr} = req.body
		// console.log(RoomNo + " , " +Area + " , " +Direction + " , " +ExteriorWallCnt + " , " +Troom_set + " , " +Tsurf_set + " , " +Troom_cr + " , " +Tsurf_cr + " , " +CheckInOutEnable + " , " +CheckInTime + " , " +CheckOutTime + " , " +szDesc)
		var dataBuffer = new Buffer(net.getSizeRoomConfig_t())
	  dataBuffer = net.makeRoomConfig_t(RoomNo, Area, Direction, ExteriorWallCnt, Troom_set, Tsurf_set, Troom_cr, Tsurf_cr, CheckInOutEnable, CheckInTime, CheckOutTime, szDesc);
	  dataLen = net.getSizeRoomConfig_t();
	  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_floorRad_room_config, dataLen, dataBuffer);
	  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
	  nSeq = counter.get();
	  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
	  fullBuffer = new Buffer(totalSize);
	  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
		msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
	  dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t()+net.getSizeOamMsg_t()), 0, dataLen);
	  net.writeData(client, fullBuffer, nSeq);
		res.send({ success: true })
	  // IntervalA = setInterval(checkMap, 1000, nSeq, res);
		// makeRoomConfig_t = function(roomNo, area, direction, exteriorWallCnt, troom_set, tsurf_set, troom_cr, tsurf_cr, checkInOutEnable, checkInTime, checkOutTime, szDesc)
  } else {
  	console.log('############ roomConfig update body : '+ JSON.stringify(req.body))
    const {nIdx, usRoomNo, nCheckInOutEnable, nCheckInTime, nCheckOutTime, szSubsName, szSubsTel, tReserveDate, ucPeopleCnt, szDesc, Area, Direction, ExteriorWallCnt, Troom_set, Tsurf_set, Troom_cr, Tsurf_cr} = req.body
    mysqlDB.query("update RoomsSchedule set usRoomNo=?, nCheckInOutEnable=?, nCheckInTime=?, nCheckOutTime=? szSubsName=?, szSubsTel=?, tReserveDate=?, ucPeopleCnt=?, szDesc=? where nIdx=?",
		[ usRoomNo, (nCheckInOutEnable==true?1:0), nCheckInTime, nCheckOutTime, szSubsName, szSubsTel, tReserveDate, ucPeopleCnt, szDesc, nIdx], function (err, rows, fields) {
        if (err) {
            res.send('error : ' + err);
            console.log(err)
        }
    });
		refreshRsvRooms()
		var tmpnCheckInOutEnable
		var tmpnCheckInTime
		var tmpnCheckOutTime
		for(var i=0; i<roomsArr.length; i++) {
			if(roomsArr[i].usRoomNo == usRoomNo) {
				tmpnCheckInOutEnable = roomsArr[i].nCheckInOutEnable
				tmpnCheckInTime = roomsArr[i].nCheckInTime
				tmpnCheckOutTime = roomsArr[i].nCheckOutTime
			}
		}
		var dataBuffer = new Buffer(net.getSizeRoomConfig_t())
		dataBuffer = net.makeRoomConfig_t(usRoomNo, Area, Direction, ExteriorWallCnt, Troom_set, Tsurf_set, Troom_cr, Tsurf_cr, tmpnCheckInOutEnable, tmpnCheckInTime, tmpnCheckOutTime, szDesc);
		dataLen = net.getSizeRoomConfig_t();
		msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_floorRad_room_config, dataLen, dataBuffer);
		totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
		nSeq = counter.get();
		msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
		fullBuffer = new Buffer(totalSize);
		msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
		msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
		dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t()+net.getSizeOamMsg_t()), 0, dataLen);
		net.writeData(client, fullBuffer, nSeq);
		res.send({ success: true })
  }
});

router.delete('/', (req, res, next) => { // 삭제
  // const nIdx = req.body.nIdx
	console.log('##################### delete req.body :'+ JSON.stringify(req.body))
	const { nIdx, usRoomNo } = req.body
  console.log('##################### delete nIdx :'+nIdx+', usRoomNo : ' + usRoomNo )
  mysqlDB.query('delete from RoomsSchedule where nIdx=?', [nIdx], function (err, rows, fields) {
      if (!err) {
				res.send({ success: true })
      } else {
				res.send('error : ' + err);
      }
  });
	clearRsvRoomsArr(usRoomNo)
	refreshRsvRooms()
	var tmpnCheckInOutEnable
	var tmpnCheckInTime
	var tmpnCheckOutTime
	for(var i=0; i<roomsArr.length; i++) {
		if(roomsArr[i].usRoomNo == usRoomNo) {
			console.log("^^^^^^^^^^^^^^^^^^ delete : "+JSON.stringify(roomsArr[i]))
			tmpnCheckInOutEnable = roomsArr[i].nCheckInOutEnable
			tmpnCheckInTime = roomsArr[i].nCheckInTime
			tmpnCheckOutTime = roomsArr[i].nCheckOutTime
		}
	}
	var dataBuffer = new Buffer(net.getSizeCheckIn_t())
	dataBuffer = net.makeCheckInCmd_t(usRoomNo, tmpnCheckInOutEnable, tmpnCheckInTime, tmpnCheckOutTime);
	dataLen = net.getSizeCheckIn_t();
	msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_cmd_checkIn, dataLen, dataBuffer);
	totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
	nSeq = counter.get();
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
	fullBuffer = new Buffer(totalSize);
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t());
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t()+net.getSizeOamMsg_t()), 0, dataLen);
	net.writeData(client, fullBuffer, nSeq);
})
exports.getMysqlDB = function () {
    console.log('getMysqlDB!!!!!!!!!!!!!!!!!!' );
    //return mysqlDB;
};
exports.getNet = function () {
    console.log('getNet!!!!!!!!!!!!!!!!!!' );
    //return client;
};
exports.testFunc = function (res) {
    console.log('testFunc!!!!!!!!!!!!!!!!!! ' + res );
    //res.redirect("/");
};

exports.setSeqMap = function (seq, jsonData) {
    console.log('getEmsSysConfig !!!!!!!!!!!!!!!!!! seq : ' + seq );
    //res.redirect("/");
    seqMap.set(seq, jsonData)
    console.log('getEmsSysConfig !!!!!!!!!!!!!!!!!! seqMap.get(seq) : ' + seqMap.get(seq));


};
module.exports = router;

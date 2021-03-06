var express = require('express')
var router = express.Router()
var mysqlDB = require('./../../mysql-db')
var net = require('./../socketOutput')
const counter = require('./../makeSeq.js')
const config = require('./../../../config.js')
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

	oam_event_alarm: 18,

	oam_set_floorRad_scheduler_time_config: 19,
	oam_get_floorRad_scheduler_time_config: 20,

	oam_set_floorRad_scheduler_group_control: 21,
	oam_get_floorRad_scheduler_group_control: 22,

	oam_cmd_floorRad_cm_data:23
}

var client = net.getConnection()
/* GET home page. */

var nSeq = counter.get()
var totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeEmsAuthReq_t()
var msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_Auth, Msg_Status_OK)
var msgBuffer = net.makeEmsAuthReq_t(EMS_ID, EMS_PASSWORD, UserLevel, web_interface)
var fullBuffer = new Buffer(totalSize)
msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeEmsAuthReq_t())
net.writeData(client, fullBuffer, null)

var nSeq
var totalSize
var msgHeaderBuffer
var fullBuffer

var requestAuth = function () {
	console.log("["+(new Date().toISOString())+"]################ requestAuth start!!! ################")
	nSeq = counter.get()
	totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeEmsAuthReq_t()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_Auth, Msg_Status_OK)
	msgBuffer = net.makeEmsAuthReq_t(EMS_ID, EMS_PASSWORD, UserLevel, web_interface)
	// console.log("["+(new Date().toISOString())+"]############msgBuffer hex : " + msgBuffer.toString('hex'))
	var fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeEmsAuthReq_t())
	console.log("["+(new Date().toISOString())+"]################ requestAuth end!!! ################")
	net.writeData(client, fullBuffer, null)
}
requestAuth()



var makeDataTout = function () {
	console.log("["+(new Date().toISOString())+"]################ makeDataTout start!!! ################")
	mysqlDB.query("SELECT fHout, nLastUpdateTime FROM site_temp_record where nSiteIdx = 2 AND nLastUpdateTime >= UNIX_TIMESTAMP('2020-02-17 23:25:00') AND nLastUpdateTime < UNIX_TIMESTAMP('2020-03-01')", function(err, result, fields) {
    if(err) {
      console.log("["+(new Date().toISOString())+"]############ makeDataTout error : " + err)
    }
    else{
			if(result!=null) {
				var cnt = 0
				console.log("["+(new Date().toISOString())+"]################ makeDataTout start!!! ################ result : " + result.length)
				var resultSize = result.length
				for ( var i = 0; i < resultSize; i++ ) {
					mysqlDB.query("UPDATE solbeach_tout_record SET fHout = ? WHERE nLastUpdateTime >= UNIX_TIMESTAMP('2020-01-01') AND nLastUpdateTime < UNIX_TIMESTAMP('2020-04-01') AND FROM_UNIXTIME(nLastUpdateTime, '%Y %m %d %H:%i') = FROM_UNIXTIME(?, '%Y %m %d %H:%i')",
					[ result[i].fHout, result[i].nLastUpdateTime], function (err, rows, fields) {
						console.log("["+(new Date().toISOString())+"] makeDataTout cnt : " + (cnt++) + ", len : " + resultSize)
						if (err) {
				        res.send('############ roomschedule update error : ' + err)
				        console.log(err)
				    }
			    })
					// if( i == result.length-1) {
					// 	console.log(" makeDataTout cnt : " + (i) + ", len : " + result.length)
					// }
				}
				console.log("["+(new Date().toISOString())+"]################ makeDataTout end!!! #######################")
			}
		}
  })
}
//makeDataTout()
requestAuth()
var dataLen = 0

// const startCallback = Date.now()
// while (Date.now() - startCallback < 10000) {
// }
var roomsArr = []
var makeRsvRoomsArr = function () {
	mysqlDB.query("SELECT * FROM floor_rad_room", function(err, result, fields) {
    if(err) {
      console.log("["+(new Date().toISOString())+"]############ makeRsvRoomsArr error : " + err)
    }
    else{
			if(result!=null) {
				for ( var i = 0; i < result.length; i++ ) {
					roomsArr.push({usRoomNo:result[i].usRoomNo,nCheckInOutEnable:result[i].nCheckInOutEnable,nCheckInTime:result[i].nCheckInTime,nCheckOutTime:result[i].nCheckOutTime})
				}
			}
		}
  })
	console.log(roomsArr.length)
	// console.log(roomsArr)
}
var clearRsvRoomsArr = function (usRoomNo) {
	// console.log("["+(new Date().toISOString())+"]################ clearRsvRooms start!!! ################")
	for ( var i = 0; i < roomsArr.length; i++ ) {
		if(usRoomNo == roomsArr[i].usRoomNo) {
			roomsArr[i].nCheckInOutEnable = 0
			roomsArr[i].nCheckInTime = 0
			roomsArr[i].nCheckOutTime = 0
			break
		}
	}
}

function refreshRsvRoomsArr (result, option, callback) {
	// console.log("["+(new Date().toISOString())+"]################ refreshRsvRoomsArr start!!! ################ result : " + JSON.stringify(result))
	for ( var i = 0; i < roomsArr.length; i++) {
		if(result.usRoomNo == roomsArr[i].usRoomNo) {
			roomsArr[i].nCheckInOutEnable = result.nCheckInOutEnable
			roomsArr[i].nCheckInTime = result.nCheckInTime
			roomsArr[i].nCheckOutTime = result.nCheckOutTime
			break
		}
	}
	callback(option)
}

function refreshRsvRooms (option, callback) {
	// console.log("["+(new Date().toISOString())+"]################ refreshRsvRooms start!!! ################")
	for ( var i = 0; i < roomsArr.length; i++) {
		mysqlDB.query("SELECT * FROM roomsschedule where usRoomNo = ? ORDER BY nCheckInTime asc limit 1", [roomsArr[i].usRoomNo], function(err, result, fields) {
	    if(err) {
	      console.log("["+(new Date().toISOString())+"]############ refreshRsvRooms error : " + err)
	    }
	    else{
				if(result.length != 0  ) {
					refreshRsvRoomsArr(result[0], option, callback)
				}
			}
	  })
	}
}
var processRsvRoom = function(result) {
	for ( var i = 0; i < roomsArr.length; i++) {
		//console.log("["+(new Date().toISOString())+"]################ processRsvRoom start!!! ################ : "+roomsArr[i].usRoomNo+", roomsArr[i].nCheckInTime : " + roomsArr[i].nCheckInTime +", result.nCheckInTime : " + result.nCheckInTime )
		if(roomsArr[i].usRoomNo == result.usRoomNo && ((roomsArr[i].nCheckInTime == 0) || (roomsArr[i].nCheckInTime > result.nCheckInTime))) {
			// console.log("["+(new Date().toISOString())+"]############ cycle processRsvRoom : " + JSON.stringify(result))
			roomsArr[i].nCheckInOutEnable = result.nCheckInOutEnable
			roomsArr[i].nCheckInTime = result.nCheckInTime
			roomsArr[i].nCheckOutTime = result.nCheckOutTime
			var dataBuffer = new Buffer(net.getSizeCheckIn_t())
			dataBuffer = net.makeCheckInCmd_t(result.usRoomNo, result.nCheckInOutEnable, result.nCheckInTime, result.nCheckOutTime)
			dataLen = net.getSizeCheckIn_t()
			msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_cmd_checkIn, dataLen, null)
			totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
			nSeq = counter.get()
			msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
			fullBuffer = new Buffer(totalSize)
			msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
			msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
			dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
			net.writeData(client, fullBuffer, nSeq)
			break
		}
	}
}
var checkRsvRoomsArr = function () {
	// console.log("["+(new Date().toISOString())+"]################ checkRsvRoomsArr start!!! ################")
	for ( var i = 0; i < roomsArr.length; i++) {
		mysqlDB.query("SELECT * FROM roomsschedule where usRoomNo = ? ORDER BY nCheckInTime asc limit 1", [roomsArr[i].usRoomNo], function(err, result, fields) {
	    if(err) {
	      console.log("["+(new Date().toISOString())+"]############ checkRsvRoomsArr error : " + err)
	    }
	    else{
				if(result.length != 0  ) {
					// console.log("["+(new Date().toISOString())+"]################ checkRsvRoomsArr result not zero ################ : " + JSON.stringify(result[0]))
					processRsvRoom(result[0])
				}
				else{
					// console.log('########### checkRsvRoomsArr result zero !!!')
					return null
				}
			}
	  })
	}
}

makeRsvRoomsArr()
//setInterval(checkRsvRoomsArr, 5000)
const seqMap = new Map()
const timerMap = new Map()


router.get('/', function(req, res, next) {
	console.log("["+(new Date().toISOString())+"]############ get floor_rad_room ############")
  mysqlDB.query("SELECT * FROM floor_rad_room", function(err, result, fields) {
    if(err) {
      console.log("["+(new Date().toISOString())+"]############ get floor_rad_room error : " + err)
    }
    else{
      res.json(result)
      // console.log("["+(new Date().toISOString())+"]############ get floor_rad_room from db res: " + JSON.stringify(result))
    }
  })
})

router.get('/getSiteInfo', function(req, res, next) {
	// console.log("["+(new Date().toISOString())+"]############ getSiteInfo ############")
  res.json({'siteInfo':config.siteInfo})
	// console.log("["+(new Date().toISOString())+"]############ get getSiteInfo from db res: " + JSON.stringify(config))
})

router.get('/getTime', (req, res, next) => { // 수정
	// console.log("["+(new Date().toISOString())+"]############ get /getTime ")
	var curTime = new Date().toISOString()
	res.json({"curTime": curTime})
})

router.get('/groupSchedule', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ get /groupSchedule ")
	dataLen = 0
	msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_floorRad_scheduler_group_control, dataLen, null)
	totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	net.writeData(client, fullBuffer, nSeq)
  var timer = setInterval(checkMap, 100, nSeq, res)
	timerMap.set(nSeq, timer)
})

router.put('/groupSchedule', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put groupSchedule values : " + JSON.stringify(req.body))
	var prioArr = []
	var dataBuffer = new Buffer(net.makeFloorRadSchedulerGroupConfig_t())
	dataBuffer = net.makeFloorRadSchedulerGroupConfig_t(
		req.body.config.StartTime,
		req.body.config.EndTime,
		req.body.config.GroupIndex,
		req.body.config.Use,
		req.body.config.SchedulerState,
		req.body.config.OccupiedRoomCnt,
		req.body.config.ReservedRoomCnt,
		req.body.config.SessionCnt,
		req.body.config.SessionState,
		req.body.config.Reserved
	)
	dataLen = net.getSizeFloorRadSchedulerGroupConfig_t()
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_floorRad_scheduler_group_control, dataLen, null)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
	net.writeData(client, fullBuffer, nSeq)
	res.send({ success: true })
})

router.get('/timeSchedule', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ get /timeSchedule ")
	dataLen = 0
	msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_floorRad_scheduler_time_config, dataLen, null)
	totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	net.writeData(client, fullBuffer, nSeq)
  var timer = setInterval(checkMap, 100, nSeq, res)
	timerMap.set(nSeq, timer)
})

router.put('/timeSchedule', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put timeSchedule values : " + JSON.stringify(req.body))
	var prioArr = []
	var dataBuffer = new Buffer(net.getSizeFloorRadSchedulerTimeConfig_t())
	dataBuffer = net.makeFloorRadSchedulerTimeConfig_t(
		req.body.config.HeatingState0,
		req.body.config.HeatingState1,
		req.body.config.HeatingState2,
		req.body.config.HeatingState3,
		req.body.config.HeatingState4,
		req.body.config.HeatingState5,
		req.body.config.HeatingState6,
		req.body.config.HeatingState7,
		req.body.config.HeatingState8,
		req.body.config.HeatingState9
	)
	dataLen = net.getSizeFloorRadSchedulerTimeConfig_t()
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_floorRad_scheduler_time_config, dataLen, null)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
	net.writeData(client, fullBuffer, nSeq)
	res.send({ success: true })
})


router.get('/roomPriority', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ get /roomPriority ")
	dataLen = 0
	msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_floorRad_room_priority, dataLen, null)
	totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	net.writeData(client, fullBuffer, nSeq)
  var timer = setInterval(checkMap, 100, nSeq, res)
	timerMap.set(nSeq, timer)
})

router.put('/roomStat', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put roomStat values : " + JSON.stringify(req.body))
	var dataBuffer = new Buffer(net.getSizeFloorRadRoomState())

	for (var key in req.body.roomNos) {
		if(req.body.roomNos[key] === req.body.config.RoomNo) {
			req.body.config.OptimalNeedTime = 1
		} else {
			req.body.config.OptimalNeedTime = 0
		}
		// console.log("req.body.roomNos[key] : " + req.body.roomNos[key] + ", req.body.config.OptimalNeedTime : " + req.body.config.OptimalNeedTime)
		dataBuffer = net.makeFloorRadRoomState_t(
			req.body.roomNos[key],
			req.body.config.HeatingMode,
			req.body.config.UseTsurf,
			req.body.config.RoomState,
			req.body.config.ReservedRoomType,
			req.body.config.ReservedRoomHour,
			req.body.config.CheckInOutEnable,
			req.body.config.CheckInTime,
			req.body.config.CheckOutTime,
			req.body.config.Tsurf_set,
			req.body.config.Tsurf_cr,
			req.body.config.Troom_set,
			req.body.config.Troom_cr,
			req.body.config.MH_SchedulerState,
			req.body.config.MH_HeatingTimeSec,
			req.body.config.SchGroupIndex,
			req.body.config.SchHeatingStatus,
			req.body.config.SchUse,
			req.body.config.SchState,
			req.body.config.OperationState,
			req.body.config.TotalStatus,
			req.body.config.Reserved1,
			req.body.config.Reserved2,
			req.body.config.MH_Tsurf_set,
			req.body.config.MH_Tsurf_cr,
			req.body.config.MH_Troom_set,
			req.body.config.MH_Troom_cr,
			req.body.config.HeatingSetState,
			req.body.config.HeatingCurState,
			req.body.config.PreHeatingOption,
			req.body.config.OptimalNeedTime,
			req.body.config.PreHeatingStartTime,
			req.body.config.MH_StartTime,
			req.body.config.MH_EndTime,
			req.body.config.MH_HeatingLeftTime,
			req.body.config.Tsurf_inc,
			req.body.config.Tsurf_dec,
			req.body.config.Troom_inc,
			req.body.config.Troom_dec,
			req.body.config.Troom_cur,
			req.body.config.Tsurf_cur,
			req.body.config.LastControlTime,
			req.body.config.Tset_cur,
			req.body.config.Tcr_cur)
		dataLen = net.getSizeFloorRadRoomState()
	  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_floorRad_room_state, dataLen, null)
	  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
		nSeq = counter.get()
		msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
		fullBuffer = new Buffer(totalSize)
		msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
		msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
		dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
		net.writeData(client, fullBuffer, nSeq)
		// console.log("["+(new Date().toISOString())+"]############ put roomStat (" + req.body.roomNos[key] + ") fullBuffer hex : " + fullBuffer.toString('hex'))
	}
	res.send({ success: true })
})


router.put('/ahusConfig', (req, res, next) => { // 수정
	var dataBuffer = new Buffer(net.getSizeAhuZoneConfig_t())
	console.log("["+(new Date().toISOString())+"]############ put ahusConfig values : " + JSON.stringify(req.body))
	for (var key in req.body.ahuIdxs) {
		for (var i in req.body.config) {
			if (req.body.ahuIdxs[key] == req.body.config[i].AhuIndex){
				dataBuffer = net.makeAhuZoneConfigMsg_t(
					req.body.config[i].AhuIndex,
					req.body.config[i].UseScheduler,
					req.body.config[i].NotifyOccupantsState,
					req.body.config[i].EconomizerCycle,
					req.body.config[i].UsePID,
					req.body.config[i].VarTempControl,
					req.body.config[i].HCMode,
					req.body.config[i].FanAutoManual,
					req.body.config[i].DamperAutoManual,
					req.body.config[i].Tzone_set,
					req.body.config[i].Rdamp_set,
					req.body.config[i].PPMco2_set,
					req.body.config[i].Rdamp_min,
					req.body.config[i].Rdamp_max,
					req.body.config[i].HCInitTimeMin,
					req.body.config[i].PPMco2_init,
					req.body.config[i].DamperCtrlOption,
					req.body.config[i].Desc
				)
				dataLen = net.getSizeAhuZoneConfig_t()
			  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_solBeach_zone_config, dataLen, null)
			  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
				nSeq = counter.get()
				msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
				fullBuffer = new Buffer(totalSize)
				msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
				msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
				dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
				net.writeData(client, fullBuffer, nSeq)
				break;
			}
		}
	}
	res.send({ success: true })
})

router.put('/roomPrio', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put roomPrio values : " + JSON.stringify(req.body))
	var prioArr = []
	for (var key in req.body.config) {
		var room_priority_t = {
			RoomNo: req.body.config[key].RoomNo,
			Priority: req.body.config[key].Priority,
			Reserved: req.body.config[key].Reserved
		}
		prioArr.push(room_priority_t)
	}
	var dataBuffer = new Buffer(net.getSizeFloorRadRoomPrioritiy_t())
	dataBuffer = net.makeFloorRadRoomPrioritiy_t(prioArr)
	dataLen = net.getSizeFloorRadRoomPrioritiy_t()
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_floorRad_room_priority, dataLen, null)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
	// console.log("["+(new Date().toISOString())+"]############ put roomPrio fullBuffer hex : " + fullBuffer.toString('hex'))
	net.writeData(client, fullBuffer, nSeq)
	res.send({ success: true })
})

router.get('/getAlarm', (req, res, next) => { // 수정
	// console.log("["+(new Date().toISOString())+"]############ get /getAlarm ")
  // console.log("["+(new Date().toISOString())+"]######################### getRoomConfig ######################### ")
	res.json(net.getAlarm())
	// console.log("["+(new Date().toISOString())+"]############ get getAlarm from memory: " + JSON.stringify(net.getAlarm()))
	if(net.getAlarm() != null) {
		net.chkAlarm()
	}
})

router.put('/roomStatTrend', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put /roomStatTrend : " + JSON.stringify(req.body))
	const startTime = req.body.startTime
	const endTime = req.body.endTime
	const time = req.body.time
	var beforeTime = new Date().getTime();
  // console.log("["+(new Date().toISOString())+"]######################### getRoomConfig ######################### ")
	mysqlDB.query("SELECT * FROM ( SELECT CurTime DIV ? AS m, AVG(HeatingCnt) AS HeatingCnt, AVG(HeatingRoomCnt) AS HeatingRoomCnt, AVG(Tsurf_avg) AS Tsurf_avg, AVG(Troom_avg) AS Troom_avg, AVG(Tout) AS Tout FROM floor_rad_stat WHERE CurTime >= UNIX_TIMESTAMP(?) AND CurTime < UNIX_TIMESTAMP(?) GROUP BY m ORDER BY m DESC) TMP ORDER BY m", [time, startTime, endTime], function(err, result, fields) {
		if(err) {
			console.log("["+(new Date().toISOString())+"]############ put /roomStatTrend error : " + err)
		}
		else{
			//console.log("["+(new Date().toISOString())+"]############ get /roomStatTrend :" + JSON.stringify(result))
			res.json(result)
      // console.log("["+(new Date().toISOString())+"]############ get roomStatTrend from db res: " + JSON.stringify(result))
		}
	})
})

router.put('/getRoomTrend', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put /getRoomTrend : "+JSON.stringify(req.body))
	const startTime = req.body.startTime
	const endTime = req.body.endTime
	const time = req.body.time
	const usRoomNo = req.body.usRoomNo
	var beforeTime = new Date().getTime();
  // console.log("["+(new Date().toISOString())+"]######################### getRoomConfig ######################### ")
	if(time != 0){
		mysqlDB.query(
			"SELECT * FROM ( SELECT nSetLastTime DIV ? AS m, ucRoomState, ucTotalStatus, ucSetStatus, ucCurStatus, usManHeatingMode, AVG(fTset) AS fTset, AVG(fTset_cur) AS fTset_cur, AVG(fTsurf_set) AS fTsurf_set, AVG(fTroom_set) AS fTroom_set, AVG(fTsurf_cur) AS fTsurf_cur, AVG(fTroom_cur) AS fTroom_cur FROM floor_rad_room_record WHERE usRoomNo = ? AND nSetLastTime >= UNIX_TIMESTAMP(?) AND nSetLastTime < UNIX_TIMESTAMP(?) GROUP BY m ORDER BY m DESC) TMP ORDER BY m", [time, usRoomNo, startTime, endTime], function(err, result, fields) {
			if(err) {
				console.log("["+(new Date().toISOString())+"]############ put /getRoomTrend error : " + err)
			}
			else{
				// console.log("["+(new Date().toISOString())+"]############ put /getRoomTrend :" + JSON.stringify(result))
				res.json(result)
	      // console.log("["+(new Date().toISOString())+"]############ get getRoomTrend from db res: " + JSON.stringify(result))
			}
		})
	} else {
		mysqlDB.query(
			"SELECT nSetLastTime AS m, ucRoomState, ucTotalStatus, ucSetStatus, ucCurStatus, usManHeatingMode, fTset, fTset_cur, fTsurf_set, fTroom_set, fTsurf_cur, fTroom_cur FROM floor_rad_room_record WHERE usRoomNo = ? AND nSetLastTime >= UNIX_TIMESTAMP(?) AND nSetLastTime < UNIX_TIMESTAMP(?) ORDER BY m DESC", [usRoomNo, startTime, endTime], function(err, result, fields) {
			if(err) {
				console.log("["+(new Date().toISOString())+"]############ put /getRoomTrend error : " + err)
			}
			else{
				// console.log("["+(new Date().toISOString())+"]############ put /getRoomTrend :" + JSON.stringify(result))
				res.json(result)
	      // console.log("["+(new Date().toISOString())+"]############ get getRoomTrend from db res: " + JSON.stringify(result))
			}
		})
	}
})

router.put('/solTrend', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put /getSolTrend : "+JSON.stringify(req.body))
	const startTime = req.body.startTime
	const endTime = req.body.endTime
	const time = req.body.time
	var beforeTime = new Date().getTime();
  // console.log("["+(new Date().toISOString())+"]######################### getRoomConfig ######################### ")
	mysqlDB.query("SELECT * FROM ( SELECT CurTime DIV ? AS m, AVG(HCOnCnt) AS HCOnCnt, AVG(HCOffCnt) AS HCOffCnt, AVG(VentilationCnt) AS VentilationCnt, AVG(Tzone) AS Tzone, AVG(Rdamp) AS Rdamp, AVG(PPMco2) AS PPMco2 FROM solbeach_stat WHERE CurTime >= UNIX_TIMESTAMP(?) AND CurTime < UNIX_TIMESTAMP(?) GROUP BY m ORDER BY m DESC) TMP ORDER BY m", [time, startTime, endTime], function(err, result, fields) {
		if(err) {
			console.log("["+(new Date().toISOString())+"]############ put /solTrend error : " + err)
		}
		else{
			// console.log("["+(new Date().toISOString())+"]############ get /getSolTrend :" + JSON.stringify(result))
			res.json(result)
      // console.log("["+(new Date().toISOString())+"]############ get solTrend from db res: " + JSON.stringify(result))
		}
	})
})

router.put('/siteEnv', (req, res, next) => { // 수정
console.log("["+(new Date().toISOString())+"]############ put /siteEnv req.body : " + JSON.stringify(req.body))
	const startTime = req.body.startTime
	const endTime = req.body.endTime
	const time = req.body.time
	var beforeTime = new Date().getTime();
  // console.log("["+(new Date().toISOString())+"]######################### getRoomConfig ######################### ")
	if(time != 0){
		mysqlDB.query("SELECT * FROM ( SELECT  nLastUpdateTime DIV ? AS m, AVG(fTout) AS fTout FROM site_env_record WHERE nSiteIdx = ? AND nLastUpdateTime >= UNIX_TIMESTAMP(?) AND nLastUpdateTime < UNIX_TIMESTAMP(?) GROUP BY m ORDER BY m DESC) TMP ORDER BY m ", [time, config.siteInfo, startTime, endTime], function(err, result, fields) {
			if(err) {
				console.log("["+(new Date().toISOString())+"]############ put /siteEnv error : " + err)
			}
			else{
				// console.log("["+(new Date().toISOString())+"]############ get /siteEnv :" + JSON.stringify(result))
				res.json(result)
	      // console.log("["+(new Date().toISOString())+"]############ get siteEnv from db res: " + JSON.stringify(result))
			}
		})
	} else {
		mysqlDB.query("SELECT nLastUpdateTime AS m, fTout FROM site_env_record WHERE nSiteIdx = ? AND nLastUpdateTime >= UNIX_TIMESTAMP(?) AND nLastUpdateTime < UNIX_TIMESTAMP(?) ORDER BY m DESC", [config.siteInfo, startTime, endTime], function(err, result, fields) {
			if(err) {
				console.log("["+(new Date().toISOString())+"]############ put /siteEnv error : " + err)
			}
			else{
				// console.log("["+(new Date().toISOString())+"]############ get /siteEnv else :" + JSON.stringify(result))
				res.json(result)
	      // console.log("["+(new Date().toISOString())+"]############ get siteEnv from db res: " + JSON.stringify(result))
			}
		})

	}
})



router.get('/getTemps', (req, res, next) => { // 수정
console.log("["+(new Date().toISOString())+"]############ get /getTemps start !!!! ")
	// console.log("["+(new Date().toISOString())+"]######################### getRoomConfig ######################### ")
	mysqlDB.query("SELECT fTout, fHout, nForecastIcons FROM site_env WHERE nSiteIdx = 1 limit 1", function(err, result, fields) {
		if(err) {
			console.log("["+(new Date().toISOString())+"]############ get /getTemps error : " + err)
		}
		else{
			// console.log("["+(new Date().toISOString())+"]############ get /getTemps :" + JSON.stringify(result))
			res.json(result)
			// console.log("["+(new Date().toISOString())+"]############ get siteEnv from db res: " + JSON.stringify(result))
		}
	})
})


router.put('/solAhuTrend', (req, res, next) => { // 수정
console.log("["+(new Date().toISOString())+"]############ put /solAhuTrend req.body : " + JSON.stringify(req.body))
	const ahuNo = req.body.ahuNo
	const startTime = req.body.startTime
	const endTime = req.body.endTime
	const time = req.body.time
	var beforeTime = new Date().getTime();
	if(time != 0){
		mysqlDB.query("SELECT * FROM ( SELECT nLastUpdateTime DIV ? AS m, AVG(nKHAIValue) AS nKHAIValue, AVG(fData_damper_manual_set) AS fData_damper_manual_set, AVG(fData_temp_supply) AS fData_temp_supply, AVG(cState_supplay_fan) AS cState_supplay_fan, AVG(fData_hc_set_temp) AS fData_hc_set_temp, AVG(fData_temp_return) AS fData_temp_return, AVG(fData_damper_outer_set) AS fData_damper_outer_set, cMode_damper_auto_manual, AVG(nPPMco2_cur) AS nPPMco2_cur, cMode_manual_mode, cMode_auto_mode, cMode_auto_manual FROM solbeach_zone_record WHERE nZoneIdx = ? AND nLastUpdateTime >= UNIX_TIMESTAMP(?) AND nLastUpdateTime < UNIX_TIMESTAMP(?) GROUP BY m ORDER BY m DESC) TMP ORDER BY m ", [time, ahuNo, startTime, endTime], function(err, result, fields) {
			if(err) {
				console.log("["+(new Date().toISOString())+"]############ put /solAhuTrend error : " + err)
			}
			else{
				// console.log("["+(new Date().toISOString())+"]############ get /solAhuTrend :" + JSON.stringify(result))
				res.json(result)
	      // console.log("["+(new Date().toISOString())+"]############ get solAhuTrend from db res: " + JSON.stringify(result))
			}
		})
	} else {
		mysqlDB.query("SELECT nLastUpdateTime AS m, nKHAIValue, fData_damper_manual_set, fData_temp_supply, cState_supplay_fan, fData_hc_set_temp, fData_temp_return, fData_damper_outer_set, cMode_damper_auto_manual, nPPMco2_cur, cMode_manual_mode, cMode_auto_mode, cMode_auto_manual FROM solbeach_zone_record WHERE nZoneIdx = ? AND nLastUpdateTime >= UNIX_TIMESTAMP(?) AND nLastUpdateTime < UNIX_TIMESTAMP(?) ORDER BY m DESC", [ahuNo, startTime, endTime], function(err, result, fields) {
			if(err) {
				console.log("["+(new Date().toISOString())+"]############ put /solAhuTrend error : " + err)
			}
			else{
				// console.log("["+(new Date().toISOString())+"]############ get /solAhuTrend :" + JSON.stringify(result))
				res.json(result)
	      // console.log("["+(new Date().toISOString())+"]############ get solAhuTrend from db res: " + JSON.stringify(result))
			}
		})
	}
})

router.get('/emsSysConfig', function(req, res, next) {
  dataLen = 0
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_sys_config, dataLen, null)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
  nSeq = counter.get()
	console.log("["+(new Date().toISOString())+"]############ get emsSysConfig ########## nSeq : " + nSeq)
  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
  fullBuffer = new Buffer(totalSize)
  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
  net.writeData(client, fullBuffer, nSeq)
  var timer = setInterval(checkMap, 100, nSeq, res)
	timerMap.set(nSeq, timer)
})

router.put('/emsSysConfig', (req, res, next) => { // 수정
	// console.log("["+(new Date().toISOString())+"]############ put emsSysConfig values : " + JSON.stringify(req.body))
	console.log("["+(new Date().toISOString())+"]############ put emsSysConfig req.body.configs : " + JSON.stringify(req.body.configs))
	var dataBuffer = new Buffer(net.getSizeEmsSysConf_t())
	dataBuffer = net.makeEmsSysConf_t(
		req.body.configs.PacketMinIntervalSec,
		req.body.configs.ControlPeriodSec,
		{
			IpAddress:req.body.configs.tAddr.IpAddress,
			PortNo:req.body.configs.tAddr.PortNo},
		{
			LogOption:req.body.configs.tLog.LogOption,
			LogDir:req.body.configs.tLog.LogDir,
			StatFileName:req.body.configs.tLog.StatFileName,
			LogFileName:req.body.configs.tLog.LogFileName,
			DBFileName:req.body.configs.tLog.DBFileName,
			LogPeriod:req.body.configs.tLog.LogPeriod,
			StatPeriod:req.body.configs.tLog.StatPeriod,
			DBStatPeriod:req.body.configs.tLog.DBStatPeriod},
		{
			tAddr:{IpAddress:req.body.configs.tDataBase.tAddr.IpAddress, PortNo:req.body.configs.tDataBase.tAddr.PortNo},
		  Name:req.body.configs.tDataBase.Name,
			ID:req.body.configs.tDataBase.ID,
			PassWd:req.body.configs.tDataBase.PassWd},
		{
			ID:req.body.configs.tSMS.ID,
			Key:req.body.configs.tSMS.Key},
		req.body.configs.DummyPktPeriod,
		req.body.configs.ReservedOption1,
		req.body.configs.ReservedOption2,
		req.body.configs.SiteInfo,
		{
			IpAddress:req.body.configs.tRemoteAddr.IpAddress,
			PortNo:req.body.configs.tRemoteAddr.PortNo},
		{
			ControlOption:req.body.configs.tFloorRadConf.ControlOption,
			RoomCnt:req.body.configs.tFloorRadConf.RoomCnt,
			UseTsurf:req.body.configs.tFloorRadConf.UseTsurf,
			Troom_set:req.body.configs.tFloorRadConf.Troom_set,
			Tsurf_set:req.body.configs.tFloorRadConf.Tsurf_set,
			Troom_cr:req.body.configs.tFloorRadConf.Troom_cr,
			Tsurf_cr:req.body.configs.tFloorRadConf.Tsurf_cr,
			Tctrl_res:req.body.configs.tFloorRadConf.Tctrl_res,
			CheckInHour:req.body.configs.tFloorRadConf.CheckInHour,
			RR_StayHour:req.body.configs.tFloorRadConf.RR_StayHour,
			TelNumber0:req.body.configs.tFloorRadConf.TelNumber0,
			TelNumber1:req.body.configs.tFloorRadConf.TelNumber1,
			TelNumber2:req.body.configs.tFloorRadConf.TelNumber2,
			TelNumber3:req.body.configs.tFloorRadConf.TelNumber3,
			TelNumber4:req.body.configs.tFloorRadConf.TelNumber4,
			OperationOption:req.body.configs.tFloorRadConf.OperationOption,
			MinStateChagneTimeSec:req.body.configs.tFloorRadConf.MinStateChagneTimeSec,
			Reserved1:req.body.configs.tFloorRadConf.Reserved1,
			Reserved2:req.body.configs.tFloorRadConf.Reserved2,
			CalTempInc:req.body.configs.tFloorRadConf.CalTempInc,
			Reserved3:req.body.configs.tFloorRadConf.Reserved3,
			tVariableTemp:{
				HeatingHighTemp:req.body.configs.tFloorRadConf.tVariableTemp.HeatingHighTemp,
				HeatingLowTemp:req.body.configs.tFloorRadConf.tVariableTemp.HeatingLowTemp,
				HeatingDelatTemp:req.body.configs.tFloorRadConf.tVariableTemp.HeatingDelatTemp,
				CoolingHighTemp:req.body.configs.tFloorRadConf.tVariableTemp.CoolingHighTemp,
				CoolingLowTemp:req.body.configs.tFloorRadConf.tVariableTemp.CoolingLowTemp,
				CoolingDelatTemp:req.body.configs.tFloorRadConf.tVariableTemp.CoolingDelatTemp},
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
				DecTempRate:req.body.configs.tFloorRadConf.tPreHeating.DecTempRate,
				PH_StartTimeErrRange:req.body.configs.tFloorRadConf.tPreHeating.PH_StartTimeErrRange,
				PH_LowLoadStartTimeErrRange:req.body.configs.tFloorRadConf.tPreHeating.PH_LowLoadStartTimeErrRange,
				PH_TimeSecBeforeMax1:req.body.configs.tFloorRadConf.tPreHeating.PH_TimeSecBeforeMax1,
				CooledRoomTsurf_init:req.body.configs.tFloorRadConf.tPreHeating.CooledRoomTsurf_init,
				CooledRoomPHHourInc:req.body.configs.tFloorRadConf.tPreHeating.CooledRoomPHHourInc,
				CooledRoomPHHourIncMax:req.body.configs.tFloorRadConf.tPreHeating.CooledRoomPHHourIncMax,
				MaxPreHeatingStartHour:req.body.configs.tFloorRadConf.tPreHeating.MaxPreHeatingStartHour,
				ControlPeriodSec:req.body.configs.tFloorRadConf.tPreHeating.ControlPeriodSec,
				LowLoadTimeUseRatio:req.body.configs.tFloorRadConf.tPreHeating.LowLoadTimeUseRatio,
				OccupiedRoomHeatingRatio:req.body.configs.tFloorRadConf.tPreHeating.OccupiedRoomHeatingRatio,
				ReservedRoomHeatingRatio:req.body.configs.tFloorRadConf.tPreHeating.ReservedRoomHeatingRatio},
			tNotify:{
				NotifyOption:req.body.configs.tFloorRadConf.tNotify.NotifyOption,
				NotifyIntervalSec:req.body.configs.tFloorRadConf.tNotify.NotifyIntervalSec,
				NotifyStartHour:req.body.configs.tFloorRadConf.tNotify.NotifyStartHour,
				NotifyEndHour:req.body.configs.tFloorRadConf.tNotify.NotifyEndHour}
		},
		{
			ControlOption:req.body.configs.tSolBeachConf.ControlOption,
			ZoneCnt:req.body.configs.tSolBeachConf.ZoneCnt,
			HCMode:req.body.configs.tSolBeachConf.HCMode,
			Tzone_set:req.body.configs.tSolBeachConf.Tzone_set,
			Tctrl_res:req.body.configs.tSolBeachConf.Tctrl_res,
			TelNumber0:req.body.configs.tSolBeachConf.TelNumber0,
			TelNumber1:req.body.configs.tSolBeachConf.TelNumber1,
			TelNumber2:req.body.configs.tSolBeachConf.TelNumber2,
			TelNumber3:req.body.configs.tSolBeachConf.TelNumber3,
			TelNumber4:req.body.configs.tSolBeachConf.TelNumber4,
			CO2LoadPeriodSec:req.body.configs.tSolBeachConf.CO2LoadPeriodSec,
			NoControlOption:req.body.configs.tSolBeachConf.NoControlOption,
			SchedulerOption:req.body.configs.tSolBeachConf.SchedulerOption,
			Reserved1:req.body.configs.tSolBeachConf.Reserved1,
			ControlChangeHour:req.body.configs.tSolBeachConf.ControlChangeHour,
			Tdiff_hc_decision:req.body.configs.tSolBeachConf.Tdiff_hc_decision,
			OccupantsDecisionOption:req.body.configs.tSolBeachConf.OccupantsDecisionOption,
			MaxCO2IncMF:req.body.configs.tSolBeachConf.MaxCO2IncMF,
			MaxCO2DecMF:req.body.configs.tSolBeachConf.MaxCO2DecMF,
			MaxCO2DecTimeMF:req.body.configs.tSolBeachConf.MaxCO2DecTimeMF,
			Reserved3:req.body.configs.tSolBeachConf.Reserved3,
			tRdamp:{
				Rpm_degrade:req.body.configs.tSolBeachConf.tRdamp.Rpm_degrade,
				Rdr_degrade:req.body.configs.tSolBeachConf.tRdamp.Rdr_degrade,
				Rtemp_degrade:req.body.configs.tSolBeachConf.tRdamp.Rtemp_degrade,
				Tair_supply_high:req.body.configs.tSolBeachConf.tRdamp.Tair_supply_high,
				Rdamp_set:req.body.configs.tSolBeachConf.tRdamp.Rdamp_set,
				Rdamp_min:req.body.configs.tSolBeachConf.tRdamp.Rdamp_min,
				Rdamp_max:req.body.configs.tSolBeachConf.tRdamp.Rdamp_max,
				Rdamp_ctrl_res:req.body.configs.tSolBeachConf.tRdamp.Rdamp_ctrl_res,
				Rdamp_noctrl_max:req.body.configs.tSolBeachConf.tRdamp.Rdamp_noctrl_max,
				PPMco2_set:req.body.configs.tSolBeachConf.tRdamp.PPMco2_set,
				DamperAutoManual:req.body.configs.tSolBeachConf.tRdamp.DamperAutoManual},
			tPID:{
				PIDCtrlMode:req.body.configs.tSolBeachConf.tPID.PIDCtrlMode,
				ControlStepValue:req.body.configs.tSolBeachConf.tPID.ControlStepValue,
				Kp:req.body.configs.tSolBeachConf.tPID.Kp,
				Ki:req.body.configs.tSolBeachConf.tPID.Ki,
				Kd:req.body.configs.tSolBeachConf.tPID.Kd},
			tC02Conf:{
				ControlMode:req.body.configs.tSolBeachConf.tC02Conf.ControlMode,
				PPMco2_rate_wf:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_rate_wf,
				PPMco2_wf:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_wf,
				PPMco2_empty:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_empty,
				PPMco2_occupied:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_occupied,
				PPMco2_inc_rate:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_inc_rate,
				PPMco2_dec_rate:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_dec_rate,
				PPMco2_inc_time:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_inc_time,
				PPMco2_dec_time:req.body.configs.tSolBeachConf.tC02Conf.PPMco2_dec_time},
			tVariableTemp:{
				HeatingHighTemp:req.body.configs.tSolBeachConf.tVariableTemp.HeatingHighTemp,
				HeatingLowTemp:req.body.configs.tSolBeachConf.tVariableTemp.HeatingLowTemp,
				HeatingDelatTemp:req.body.configs.tSolBeachConf.tVariableTemp.HeatingDelatTemp,
				CoolingHighTemp:req.body.configs.tSolBeachConf.tVariableTemp.CoolingHighTemp,
				CoolingLowTemp:req.body.configs.tSolBeachConf.tVariableTemp.CoolingLowTemp,
				CoolingDelatTemp:req.body.configs.tSolBeachConf.tVariableTemp.CoolingDelatTemp},
			tEconomizerCycle:{
				Tout:req.body.configs.tSolBeachConf.tEconomizerCycle.Tout,
				Hout:req.body.configs.tSolBeachConf.tEconomizerCycle.Hout,
				Eout:req.body.configs.tSolBeachConf.tEconomizerCycle.Eout,
				Reserved:req.body.configs.tSolBeachConf.tEconomizerCycle.Reserved},
			tNotify:{
				NotifyOption:req.body.configs.tSolBeachConf.tNotify.NotifyOption,
				NotifyIntervalSec:req.body.configs.tSolBeachConf.tNotify.NotifyIntervalSec,
				NotifyStartHour:req.body.configs.tSolBeachConf.tNotify.NotifyStartHour,
				NotifyEndHour:req.body.configs.tSolBeachConf.tNotify.NotifyEndHour}
		}
	)
	// console.log(dataBuffer.toString('hex'))
	dataLen = net.getSizeEmsSysConf_t()
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_sys_config, dataLen, null)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
	net.writeData(client, fullBuffer, nSeq)
	res.send({ success: true })
})


router.get('/ahusConfigDB', function(req, res, next) {
	console.log("["+(new Date().toISOString())+"]############ get ahusConfigDB ")
  mysqlDB.query("SELECT * FROM ahu_info", function(err, result, fields) {
    if(err) {
      console.log("["+(new Date().toISOString())+"]############ get ahusConfigDB error : " + err)
    }
    else{
      res.json(result)
      // console.log("["+(new Date().toISOString())+"]############ get ahusConfigDB from db res: " + JSON.stringify(result))
    }
  })
})
router.get('/zones', function(req, res, next) {
	console.log("["+(new Date().toISOString())+"]############ get zones ")
  mysqlDB.query("SELECT * FROM solbeach_zone", function(err, result, fields) {
    if(err) {
      console.log("["+(new Date().toISOString())+"]############ get zones error : " + err)
    }
    else{
			// console.log(JSON.stringify(result))
      res.json(result)
      // console.log("["+(new Date().toISOString())+"]############ get zones from db res: " + JSON.stringify(result))
    }
  })
})

var IntervalB
var IntervalC
var ahusConfigData = []
router.get('/ahusConfig/:ahuIndex', function(req, res, next) {
  const ahuIndex = req.params.ahuIndex
	var data = new Uint16Array(2)
	data[0] = ahuIndex
  dataLen = 0
	console.log("["+(new Date().toISOString())+"]############ get /ahusConfig/:ahuIndex : " + ahuIndex)
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_solBeach_zone_config, dataLen, data)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
  nSeq = counter.get()
  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
  fullBuffer = new Buffer(totalSize)
  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
  net.writeData(client, fullBuffer, nSeq)
  var timer = setInterval(checkMap, 100, nSeq, res)
	timerMap.set(nSeq, timer)
})

var pushMap = function(seq, res, idx) {
  // console.log("["+(new Date().toISOString())+"]######################### checkMap ######################### ")
	if(idx == 1) 	clearInterval(IntervalB)
	if (idx <= 20) {
		var json = seqMap.get(seq)
	  if(json != '' && json != null) {
			try {
				// console.log("["+(new Date().toISOString())+"]############ pushMap push!!!!!! ############# ")
	    	ahusConfigData.push(JSON.parse(seqMap.get(nSeq)))
				// throw new Error('오류 핸들링 테스트')
			}
			catch (exception) {
				console.log("["+(new Date().toISOString())+"]############ exception!!!!!! ############# ")
				console.log(exception)
				console.log("["+(new Date().toISOString())+"]########################################## ")
				return true
			}
			var data = new Uint16Array(2)
			data[0] = idx+1
		  dataLen = 0
		  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_solBeach_zone_config, dataLen, data)
		  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
		  nSeq = counter.get()
		  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
		  fullBuffer = new Buffer(totalSize)
		  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
		  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
		  net.writeData(client, fullBuffer, nSeq)
			// console.log("["+(new Date().toISOString())+"]############ pushMap len : " + ahusConfigData.length)
		  clearInterval(IntervalC)
		  IntervalC = setInterval(pushMap, 10, nSeq, res, idx+1)
	  }
	} else {
		clearInterval(IntervalC)
		console.log("["+(new Date().toISOString())+"]############ pushMap end len : " + ahusConfigData.length)
		res.json(ahusConfigData)
	}

}
router.get('/damperConfig/:ahuIndex', function(req, res, next) {
	console.log("["+(new Date().toISOString())+"]############ get /damperConfig/:ahuIndex values : " + JSON.stringify(req.body))
  const ahuIndex = req.params.ahuIndex
	var data = new Uint16Array(2)
	data[0] = ahuIndex
  dataLen = 0
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_solBeach_damper_scheduler, dataLen, data)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
  nSeq = counter.get()
  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
  fullBuffer = new Buffer(totalSize)
  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
  net.writeData(client, fullBuffer, nSeq)
  var timer = setInterval(checkMap, 100, nSeq, res)
	timerMap.set(nSeq, timer)
})

router.put('/damperConfig', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put damperConfig values : " + JSON.stringify(req.body))
	var dataBuffer = new Buffer(net.getSizeDamperSchedulerConfig_t())
	// "Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},
	dataBuffer = net.makeDamperSchedulerConfig_t(
		req.body.damperConfig.AhuIndex, req.body.damperConfig.Reserved, req.body.damperConfig.tSch
	)
	// console.log("damperConfig : " + dataBuffer.toString('hex'))
	dataLen = net.getSizeDamperSchedulerConfig_t()
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_solBeach_damper_scheduler, dataLen, null)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
	net.writeData(client, fullBuffer, nSeq)
	res.send({ success: true })
})


router.put('/cmdManualHeating', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put cmdManualHeating values : " + JSON.stringify(req.body))
	var dataBuffer = new Buffer(net.getSizeManualHeating_t())
	// "Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},{"Mode":0,"Hour":0,"Min":0,"Ratio":0},
	dataBuffer = net.makeManualHeating_t(
		req.body.RoomNo, req.body.HeatingMode, req.body.HeatingTimeSec, req.body.Tset, req.body.Tset_cr
	)
	// console.log("cmdManualHeating : " + dataBuffer.toString('hex'))
	dataLen = net.getSizeManualHeating_t()
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_cmd_floorRad_manual_heating, dataLen, null)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
	net.writeData(client, fullBuffer, nSeq)
	res.send({ success: true })
})

router.put('/cmdRoomState', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put cmdRoomState values : " + JSON.stringify(req.body))
  var data = new Uint16Array(2)
	data[0] = req.body.RoomNo
	data[1] = req.body.RoomState
	dataLen = 0
	// console.log("/cmdRoomState/:roomNo hex : " +data.toString('hex'))
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_cmd_floorRad_room_state, dataLen, data)
	// console.log("/cmdRoomState/:roomNo msgBuffer : " +msgBuffer.toString('hex'))
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	net.writeData(client, fullBuffer, nSeq)
	res.send({ success: true })
})


var checkMap = function(seq, res) {
  // console.log("["+(new Date().toISOString())+"]######################### checkMap ######################### ")
  var json = seqMap.get(seq)
  if(json != '' && json != null) {
		try {
			// console.log("checkMap seq : " + seq)
			// console.log(res.socket)
			res.json(seqMap.get(seq))
		  clearInterval(timerMap.get(seq))
			// throw new Error('오류 핸들링 테스트')
		}
		catch (exception) {
			console.log(exception)
			return true
		}
    // console.log("configSetting seqMap.get(nSeq) : " + seqMap.get(nSeq))
    seqMap.delete(seq)
    timerMap.delete(seq)
  }
}
router.get('/getRoomConfig/:roomNo', (req, res, next) => { // 수정
	const roomNo = req.params.roomNo
	console.log("["+(new Date().toISOString())+"]############ get /getRoomConfig/:roomNo  roomNo : "+roomNo+", body : " + JSON.stringify(req.body))
  // console.log("["+(new Date().toISOString())+"]######################### getRoomConfig ######################### ")
	var data = new Uint16Array(2)
	data[0] = roomNo
	dataLen = 0
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_floorRad_room_config, dataLen, data)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
  nSeq = counter.get()
  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
  fullBuffer = new Buffer(totalSize)
  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
  net.writeData(client, fullBuffer, nSeq)
  var timer = setInterval(checkMap, 100, nSeq, res)
	timerMap.set(nSeq, timer)
})

router.post('/', (req, res, next) => { // 생성
  console.log('###### post ###### body : '+ JSON.stringify(req.body))
  const {usRoomNo, nCheckInOutEnable, nCheckInTime, nCheckOutTime, szSubsName, szSubsTel, tReserveDate, ucPeopleCnt, szDesc, Area, Direction, ExteriorWallCnt, Troom_set, Tsurf_set, Troom_cr, Tsurf_cr} = req.body
  mysqlDB.query("INSERT INTO RoomsSchedule (nIdx, usRoomNo, nCheckInOutEnable, nCheckInTime, nCheckOutTime, szSubsName, szSubsTel, tReserveDate, ucPeopleCnt, szDesc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  [ null, usRoomNo, nCheckInOutEnable, nCheckInTime, nCheckOutTime, szSubsName, szSubsTel, tReserveDate, ucPeopleCnt, szDesc], function (err, rows, fields) {
    if (err) {
        res.send('###### post error : ' + err)
        console.log(err)
    }
  })
	for ( var i = 0; i < roomsArr.length; i++ ) {
		if(roomsArr[i].usRoomNo == usRoomNo) {
			refreshRsvRooms(
				{
					type:'update', Area:Area, Direction:Direction, ExteriorWallCnt:ExteriorWallCnt,
					Troom_set:Troom_set, Tsurf_set:Tsurf_set, Troom_cr:Troom_cr,
					Tsurf_cr:Tsurf_cr, szDesc:szDesc, data:roomsArr[i]
				},
				processCmdCheckIn )
			break
		}
	}
	res.send({ success: true })
})
router.put('/:type', (req, res, next) => { // 수정
  const type = req.params.type
  console.log('############ roomConfig update type : ' + type + 'body : '+ JSON.stringify(req.body))
  if(type == "roomStat") {
    const { RoomNo, Area, Direction, ExteriorWallCnt, Troom_set, Tsurf_set, Troom_cr, Tsurf_cr, CheckInOutEnable,
			CheckInTime, CheckOutTime, szDesc, HeatingMode, HeatingTimeSec, Tset, Tset_cr} = req.body
		// console.log(RoomNo + " , " +Area + " , " +Direction + " , " +ExteriorWallCnt + " , " +Troom_set + " , " +Tsurf_set + " , " +Troom_cr + " , " +Tsurf_cr + " , " +CheckInOutEnable + " , " +CheckInTime + " , " +CheckOutTime + " , " +szDesc)
		var dataBuffer = new Buffer(net.getSizeRoomConfig_t())
	  dataBuffer = net.makeRoomConfig_t(RoomNo, Area, Direction, ExteriorWallCnt, Troom_set, Tsurf_set, Troom_cr, Tsurf_cr, CheckInOutEnable, CheckInTime, CheckOutTime, szDesc)
	  dataLen = net.getSizeRoomConfig_t()
	  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_floorRad_room_config, dataLen, dataBuffer)
	  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	  nSeq = counter.get()
	  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	  fullBuffer = new Buffer(totalSize)
	  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
		msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	  dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
	  net.writeData(client, fullBuffer, nSeq)
	  // IntervalA = setInterval(checkMap, 100, nSeq, res)
		// makeRoomConfig_t = function(roomNo, area, direction, exteriorWallCnt, troom_set, tsurf_set, troom_cr, tsurf_cr, checkInOutEnable, checkInTime, checkOutTime, szDesc)
  } else {
  	console.log('############ roomschedule update body : '+ JSON.stringify(req.body))
    const {nIdx, usRoomNo, nCheckInOutEnable, nCheckInTime, nCheckOutTime, szSubsName, szSubsTel, tReserveDate, ucPeopleCnt, szDesc, Area, Direction, ExteriorWallCnt, Troom_set, Tsurf_set, Troom_cr, Tsurf_cr} = req.body
    mysqlDB.query("UPDATE RoomsSchedule SET usRoomNo = ?, nCheckInOutEnable = ?, nCheckInTime = ?, nCheckOutTime = ?, szSubsName = ?, szSubsTel = ?, ucPeopleCnt = ?, szDesc = ? WHERE nIdx = ?",
		[ usRoomNo, nCheckInOutEnable, nCheckInTime, nCheckOutTime, szSubsName, szSubsTel, ucPeopleCnt, szDesc, nIdx], function (err, rows, fields) {
			if (err) {
	        res.send('############ roomschedule update error : ' + err)
	        console.log(err)
	    }
    })
		for ( var i = 0; i < roomsArr.length; i++ ) {
			if(roomsArr[i].usRoomNo == usRoomNo) {
				refreshRsvRooms(
					{
						type:'update', Area:Area, Direction:Direction, ExteriorWallCnt:ExteriorWallCnt,
						Troom_set:Troom_set, Tsurf_set:Tsurf_set, Troom_cr:Troom_cr,
						Tsurf_cr:Tsurf_cr, szDesc:szDesc, data:roomsArr[i]
					},
					processCmdCheckIn )
				break
			}
		}
  }
	res.send({ success: true })
})

router.delete('/', (req, res, next) => { // 삭제
  // const nIdx = req.body.nIdx
	// console.log('##################### delete req.body :'+ JSON.stringify(req.body))
	const { nIdx, usRoomNo } = req.body
  console.log('############ delete roomschedule  nIdx :'+nIdx+', usRoomNo : ' + usRoomNo )
  mysqlDB.query('delete from RoomsSchedule where nIdx=?', [nIdx], function (err, rows, fields) {
      if (!err) {
				res.send({ success: true })
      } else {
				res.send('############ delete roomschedule error : ' + err)
      }
  })
	clearRsvRoomsArr(usRoomNo)
	for ( var i = 0; i < roomsArr.length; i++ ) {
		if(roomsArr[i].usRoomNo == usRoomNo) {
			refreshRsvRooms({type:'delete', data:roomsArr[i]}, processCmdCheckIn)
			break
		}
	}

})

var processCmdCheckIn = function(datas) {
	if(datas.type == 'delete') {
		var dataBuffer = new Buffer(net.getSizeCheckIn_t())
		dataBuffer = net.makeCheckInCmd_t(datas.data.usRoomNo, datas.data.tmpnCheckInOutEnable, datas.data.nCheckInTime, datas.data.nCheckOutTime)
		dataLen = net.getSizeCheckIn_t()
		msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_cmd_checkIn, dataLen, dataBuffer)
		totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
		nSeq = counter.get()
		msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
		fullBuffer = new Buffer(totalSize)
		msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
		msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
		dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
		net.writeData(client, fullBuffer, nSeq)
	}
	else {
		var dataBuffer = new Buffer(net.getSizeRoomConfig_t())
		dataBuffer = net.makeRoomConfig_t(datas.data.usRoomNo, datas.Area, datas.Direction, datas.ExteriorWallCnt, datas.Troom_set, datas.Tsurf_set, datas.Troom_cr, datas.Tsurf_cr, datas.data.nCheckInOutEnable, datas.data.nCheckInTime, datas.data.nCheckOutTime, datas.szDesc)
		dataLen = net.getSizeRoomConfig_t()
		msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_set_floorRad_room_config, dataLen, dataBuffer)
		totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
		nSeq = counter.get()
		msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
		fullBuffer = new Buffer(totalSize)
		msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
		msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
		dataBuffer.copy(fullBuffer, (net.getSizeEmsMsgHeader_t() +net.getSizeOamMsg_t()), 0, dataLen)
		net.writeData(client, fullBuffer, nSeq)
	}
}


router.get('/getRoomStat/:roomNo', function(req, res, next) {
  const roomNo = req.params.roomNo
	var data = new Uint16Array(2)
	data[0] = roomNo
	console.log("["+(new Date().toISOString())+"]############ get /getRoomStat/:roomNo : " + roomNo)
  dataLen = 0
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_floorRad_room_state, dataLen, data)
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
  nSeq = counter.get()
  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
  fullBuffer = new Buffer(totalSize)
  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
  net.writeData(client, fullBuffer, nSeq)
  var timer = setInterval(checkMap, 100, nSeq, res)
	timerMap.set(nSeq, timer)
})

router.get('/cmdFloorRadCmData', (req, res, next) => { // 수정
	console.log("["+(new Date().toISOString())+"]############ put cmdFloorRadCmData start ! ")
	dataLen = 0
	msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_cmd_floorRad_cm_data, dataLen, null)
	totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen
	nSeq = counter.get()
	msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK)
	fullBuffer = new Buffer(totalSize)
	msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t())
	msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeOamMsg_t())
	net.writeData(client, fullBuffer, nSeq)
	res.send({ success: true })
})

exports.setSeqMap = function (seq, jsonData) {
    // res.redirect("/")
    seqMap.set(seq, jsonData)
    // console.log('setSeqMap seq : '+seq+' seqMap.get(seq) : ' + seqMap.get(seq))
}

exports.reconnectAuth = function () {
    console.log('reconnectAuth!!! ')
    requestAuth()
}
module.exports = router

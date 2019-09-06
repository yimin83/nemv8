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
	oam_set_floorRad_room_config : 5,
	oam_get_floorRad_room_config : 6,
	oam_set_solBeach_zone_config : 7,
	oam_get_solBeach_zone_config : 8,
	oam_set_solBeach_damper_scheduler : 9,
	oam_get_solBeach_damper_scheduler : 10
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

const seqMap = new Map()
router.get('/', function(req, res, next) {
  mysqlDB.query("SELECT * FROM RoomStat;", function(err, result, fields){
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
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeEmsAuthReq_t());
  net.writeData(client, fullBuffer, nSeq);
  IntervalA = setInterval(checkMap, 1000, nSeq, res);
});

router.get('/damperConfig/:ahuIndex', function(req, res, next) {
  console.log("######################### damperConfig ######################### ")
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
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeEmsAuthReq_t());
  net.writeData(client, fullBuffer, nSeq);
  IntervalA = setInterval(checkMap, 1000, nSeq, res);
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
router.get('/:roomNo', (req, res, next) => { // 수정
  const roomNo = req.params.roomNo
  console.log(req.body)
    mysqlDB.query("SELECT * FROM RoomsSchedule where roomNo = ?;", [roomNo], function(err, result, fields){
      if(err){
        console.log("쿼리문에 오류가 있습니다.");
      }
      else{
        res.json(result);
        //console.log(result)
      }
    });

    // dataLen = 0;
    // msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_floorRad_room_config, dataLen, null);
    // totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
    // nSeq = counter.get();
    // msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
    // fullBuffer = new Buffer(totalSize);
    // msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
    // msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeEmsAuthReq_t());
    // net.writeData(client, fullBuffer, nSeq);
    // IntervalA = setInterval(checkMap, 1000, nSeq, res);
});
router.get('/getRoomConfig/:roomNo', (req, res, next) => { // 수정
  const roomNo = req.params.roomNo
  console.log("######################### getRoomConfig ######################### ")
  var dataBuffer = new Buffer(4)
  dataBuffer.writeUInt32LE(roomNo);
  console.log("roomNo : "+roomNo+", dataBuffer : " + dataBuffer.toString('hex'))
  dataLen = 0;
  msgBuffer = net.makeOamMsg_t(oam_msg_type_e.oam_get_floorRad_room_config, dataLen, dataBuffer);
  totalSize = net.getSizeEmsMsgHeader_t() + net.getSizeOamMsg_t() + dataLen;
  nSeq = counter.get();
  msgHeaderBuffer = net.makeEmsMsgHeader_t(EMS_PREAMBLE, EMS_VERSION, totalSize, 0, nSeq, Msg_Type_OAM, Msg_Status_OK);
  fullBuffer = new Buffer(totalSize);
  msgHeaderBuffer.copy(fullBuffer, 0, 0, net.getSizeEmsMsgHeader_t());
  msgBuffer.copy(fullBuffer, net.getSizeEmsMsgHeader_t(), 0, net.getSizeEmsAuthReq_t());
  net.writeData(client, fullBuffer, nSeq);
  IntervalA = setInterval(checkMap, 1000, nSeq, res);
});

router.post('/', (req, res, next) => { // 생성
  console.log('post body : '+ req.body)
  const {roomNo, checkInOutEnbale, strCheckInTime, checkInTime, strCheckOutTime, checkOutTime, subsName, subsTel, resDate, peopleCnt, strDesc} = req.body
  mysqlDB.query("INSERT INTO RoomsSchedule (idx, roomNo, checkInOutEnbale, strCheckInTime, checkInTime, strCheckOutTime, checkOutTime, subsName, subsTel, resDate, peopleCnt, strDesc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  [ null, roomNo, (checkInOutEnbale==true?1:0), strCheckInTime, checkInTime, strCheckOutTime, checkOutTime, subsName, subsTel, resDate, peopleCnt, strDesc], function (err, rows, fields) {
    if (!err) {
      // var client = net.getConnection();
      // var buffer = net.makeSetRoomConfig(roomNo, 1, );
      // net.writeData(client, buffer);
      // buffer = net.makeSetRoomState(roomNo, 1);
      // net.writeData(client, buffer);
      // console.log('Room net.makeData() : '+ net.makeData());
      res.send({ success: true })
      //res.redirect("/");
    } else {
        res.send('error : ' + err);
        console.log(err)
    }
  });
});
router.put('/:type', (req, res, next) => { // 수정
  const type = req.params.type
  console.log('type : ' + type + 'body : '+req.body)
  if(type == "roomStat"){
    const { roomNo, heatingMode, setTemp, controlRange, heatingTimeSec, roomState, roomType, pos, isBestRoom, boilerOn }  = req.body
    mysqlDB.query('update RoomStat set heatingMode=?, setTemp=?, controlRange=?, heatingTimeSec=?, roomState=?, roomType=?, pos=?, isBestRoom=?, boilerOn=? where roomNo=?',
      [ heatingMode, setTemp, controlRange, heatingTimeSec, roomState, roomType, pos, isBestRoom, boilerOn, roomNo], function (err, rows, fields) {
        if (!err) {
          // var client = net.getConnection();
          // var buffer = net.makeSetRoomConfig(roomNo, 1, );
          // net.writeData(client, buffer);
          // buffer = net.makeSetRoomState(roomNo, 1);
          // net.writeData(client, buffer);
          // console.log('Room net.makeData() : '+ net.makeData());
          res.send({ success: true })
          //res.redirect("/");
        } else {
            res.send('error : ' + err);
            console.log(err)
        }
    });
  }else {
    const {idx, roomNo, checkInOutEnbale, strCheckInTime, checkInTime, strCheckOutTime, checkOutTime, subsName, subsTel, resDate, peopleCnt, strDesc} = req.body
    mysqlDB.query("update RoomsSchedule set roomNo=?, checkInOutEnbale=?, strCheckInTime=?, checkInTime=?, strCheckOutTime=?, checkOutTime=?, subsName=?, subsTel=?, resDate=?, peopleCnt=?, strDesc=? where idx=?",
    [ roomNo, (checkInOutEnbale==true?1:0), strCheckInTime, checkInTime, strCheckOutTime, checkOutTime, subsName, subsTel, resDate, peopleCnt, strDesc, idx], function (err, rows, fields) {
        if (!err) {
          // var client = net.getConnection();
          // var buffer = net.makeSetRoomConfig(roomNo, setTemp, 4);
          // net.writeData(client, buffer);
          // console.log('Temp net.makeData() : '+ net.makeData());
          res.send({ success: true })
          //res.redirect("/");
        } else {
            res.send('error : ' + err);
            console.log(err)
        }
    });
  }
});

router.delete('/:idx', (req, res, next) => { // 삭제
  const idx = req.params.idx
  //console.log('idx : ' + idx)
  mysqlDB.query('delete from RoomsSchedule where idx=?', [idx], function (err, rows, fields) {
      if (!err) {
        res.send({ success: true })
        console.log("delete ok")
      } else {
          res.send('error : ' + err);
      }
  });
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

var express = require('express');
var router = express.Router();
var mysqlDB = require('./../../mysql-db');
var net = require('./../socketOutput');

mysqlDB.connect();
/* GET home page. */
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


module.exports = router;

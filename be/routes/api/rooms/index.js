var express = require('express');
var router = express.Router();
var mysqlDB = require('./../../mysql-db');
var net = require('./../socketOutput');

mysqlDB.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
  mysqlDB.query("SELECT * FROM rooms;", function(err, result, fields){
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      res.json(result);
      console.log(result)
    }
  });
});

router.post('/', (req, res, next) => { // 생성
  mysqlDB.query("INSERT INTO rooms (name, modelnumber, series) VALUES (?, ?, ?)", [
      body.name, body.modelnumber, body.series
    ], function(){
      res.redirect("/");
  });
});

router.put('/:type', (req, res, next) => { // 수정
  const type = req.params.type
  if(type == "room"){
    console.log(req.body)
    const { roomNo, beReserved, startDate, endDate, checkInTime, checkOutTime, subsName, subsTel, peopleCnt }  = req.body
    mysqlDB.query('update rooms set beReserved=?, startDate=?, endDate=?, checkInTime=?, checkOutTime=?, subsName=?, subsTel=?, peopleCnt=? where roomNo=?',
      [beReserved, startDate, endDate, checkInTime, checkOutTime, subsName, subsTel, peopleCnt, roomNo], function (err, rows, fields) {
        if (!err) {
          var client = net.getConnection();
          var buffer = net.makeSetRoomConfig(roomNo, 1, );
          net.writeData(client, buffer);
          buffer = net.makeSetRoomState(roomNo, 1);
          net.writeData(client, buffer);
          console.log('Room net.makeData() : '+ net.makeData());
          res.send({ success: true })
        } else {
            res.send('error : ' + err);
            console.log(err)
        }
    });
  }else {
    const { roomNo, isBestRoom, isSmart, setTemp }  = req.body
    mysqlDB.query('update rooms set isBestRoom=?, isSmart=?, setTemp=? where roomNo=?',
      [isBestRoom, isSmart, setTemp, roomNo], function (err, rows, fields) {
        if (!err) {
          res.send({ success: true })
          var client = net.getConnection();
          var buffer = net.makeSetRoomConfig(roomNo, setTemp, 4);
          net.writeData(client, buffer);
          console.log('Temp net.makeData() : '+ net.makeData());
        } else {
            res.send('error : ' + err);
            console.log(err)
        }
    });
  }
});

router.delete('/:roomNo', (req, res, next) => { // 삭제
  const roomNo = req.paramss.roomNo
  mysqlDB.query('delete from rooms where id=?', [roomNo], function (err, rows, fields) {
      if (!err) {
        res.send({ success: true })
        console.log("delete ok")
      } else {
          res.send('error : ' + err);
      }
  });
})


module.exports = router;

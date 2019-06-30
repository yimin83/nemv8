var express = require('express');
var router = express.Router();
var mysqlDB = require('./../../mysql-db');
var net_client = require('net');

function getConnection(){
    //서버에 해당 포트로 접속
    var client = "";
    var recvData = [];
    var local_port = "";

    client = net_client.connect({port: 8000, host:'localhost'}, function() {

        console.log("connect log======================================================================");
        console.log('connect success');
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

function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
      console.log("Server Send Fail");
  }
}

mysqlDB.connect();
/* GET home page. */
router.get('/', function(req, res, next) {
  mysqlDB.query("SELECT * FROM rooms;", function(err, result, fields){
    if(err){
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      res.json(result);
      // console.log(result)
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
    const { roomNo, beReserved, startDate, endDate, inTime, outTime, subsName, subsTel, peopleCnt }  = req.body
    mysqlDB.query('update rooms set beReserved=?, startDate=?, endDate=?, inTime=?, outTime=?, subsName=?, subsTel=?, peopleCnt=? where roomNo=?',
      [beReserved, startDate, endDate, inTime, outTime, subsName, subsTel, peopleCnt, roomNo], function (err, rows, fields) {
        if (!err) {
          console.log("room put ok")
          var client = getConnection();
          writeData(client, "room!!!!");
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
          var client = getConnection();
          writeData(client, "temp!!!!");
          console.log("temp put ok")
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

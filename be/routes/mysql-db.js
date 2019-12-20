// const mysql = require("mysql");
// const config = require('./../config.js')
//
// const pool = mysql.createPool(config);
//
// pool.on('acquire', function (connection) {
//   console.log('################# acquire ' + `Connection ${connection.threadId} acquired` + ' #################');
// });
//
// pool.on('enqueue', function () {
//   console.log('################# enqueue Waiting for available connection slot #################');
// });
//
// pool.on('release', function (connection) {
//   console.log('################# release ' + `Connection ${connection.threadId} released` + ' #################');
//   logger.info();
// });
//
// const getConn = function(callback) {
//   pool.getConnection(function(err, connection) {
//     callback(err, connection);
//   });
// }
//
// module.exports = getConn;


var mysql = require('mysql')
const config = require('./../config.js')
var db_config = {
  host : config.dbHost,
  port : config.dbPort,
  user : config.dbUser,
  password : config.dbPassword,
  database : config.dbDatabase
};
var connection;
function startConnection() {
  connection = null
  connection = mysql.createConnection(db_config);
  connection.connect(function(err) {
    if(err) {
      console.log('################# error when connecting to MySQL #################');
      console.log(err);
      connection.destroy()
      startConnection()
    } else {
      console.log('################# MySQL Connected! #################')
    }
  });

  // connection.on('connect', function() {
  //   console.log("==================================== MySQL connect start ==========================================");
  //   if(isNotFirst) {
  //     startConnection()
  //   }
  //   isNotFirst = true
  //   console.log("==================================== MySQL connect end ==========================================");
  // });

  connection.on('error', function(err) {
    console.log('################# MySQL error #################');
    console.log(error);
    if(err.fatal) {
      connection.destroy()
      startConnection()
      console.log('################# MySQL end #################');
    }
  });
}
startConnection();
setInterval (function () {
  connection.query('select 1', function (err, results) {
    if(err) console.log('select : ' + err.code);
  });
}, 10000)
module.exports = connection

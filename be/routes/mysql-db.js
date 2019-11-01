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
  connection = mysql.createConnection(db_config);                                    
  connection.connect(function(err) {
    if(err) {
      console.log('################# error when connecting to MySQL :', err);
      startConnection()
    } else {
      console.log('################# MySQL Connected! #################')
    }
  });
  connection.on('error', function(err) {
    console.log('################# MySQL error : ', err);
    if(err.fatal) {
      startConnection()
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

var mysql = require('mysql')
var connection = mysql.createConnection({
  host : "192.168.1.156",
  port : 3306,
  user : "root",
  password : "tlavmf",
  database : "ocean"
})
module.exports = connection;

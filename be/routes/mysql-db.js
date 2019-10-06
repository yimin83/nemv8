var mysql = require('mysql')
const config = require('./../config.js')
var connection = mysql.createConnection({
  host : config.dbHost,
  port : config.dbPort,
  user : config.dbUser,
  password : config.dbPassword,
  database : config.dbDatabase
})
module.exports = connection

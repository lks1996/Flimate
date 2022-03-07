var mysql = require('mysql');
var db = mysql.createConnection({
  host : 'localhost',
  port : '3307',
  user : 'root',
  password : '111111',
  database : 'flimate'
});

db.connect();

module.exports = db;

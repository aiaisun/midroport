const mysql = require('mysql');
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    port: '8889',
    database : 'midReport'
}) ;

db.connect();

module.exports = db;

const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

let mysqlCon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mySQLpassword",
    database: "sql_music_service",
    multipleStatements: true
  });

mysqlCon.connect(err => {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', (req, res) => {
res.send("Hello World!")
});

app.listen(3001);
const config = require('./config.json');
var express = require('express');
var pg = require("pg");
var app = express();

const databaseConfig = config.database;
var pool = new pg.Pool(databaseConfig)

app.get('/', function (req, res, next) {
  pool.connect(function (err, client, done) {
    if (err) {
        console.log("Can not connect to the DB" + err);
    };
    client.query('SELECT * FROM employer', function (err, result) {
         done();
         if (err) {
             console.log(err);
             res.status(400).send(err);
         };
         res.status(200).send(result.rows);
    });
  });
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});
const config = require('./config.json');
var express = require('express');
var app = express();
var { sequelize } = require('./database/sequelize')

app.get('/', function(req, res, next) {
  sequelize.query("SELECT * FROM employee").spread((results, metadata) => {
    res.status(200).send(results);
  });
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});
var express = require('express');
var app = express();
var { sequelize } = require('./database/sequelize')

const databaseConfig = config.database;

const insertEmployee = (req, res) => {
  var employee_id = req.body.employee_id;
  var name = req.body.name;
  var salary = req.body.salary;
  var vs = req.body.vs;
  var ve = req.body.ve;
  var results = [];

  sequelize.query(`SELECT * FROM employee WHERE employee_id = ${employee_id} AND name = ${name} AND salary = ${salary}`).spread((results, metadata) => {
    if (results.length == 0) {
      sequelize.query(`INSERT INTO employee(employee_id, name, salary, vs, ve) VALUES(${employee_id}, ${name}, ${salary}, ${vs}, ${ve})`).spread((results, metadata) => {
        res.status(200, "success");
      });
    }else{
      console.log("check");
    }
  });
}

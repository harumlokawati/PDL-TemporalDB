var express = require('express');
var app = express();
var queries = require('./queries.js')
var db = require('./database/sequelize')
var cors = require('cors');

app.use(cors())
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/select_employee', function(req, res, next) {
  db.sequelize.query("SELECT * FROM employee").spread((results, metadata) => {
    res.status(200).send({"data":results, "message":"Success", "status":200});
  });
});

app.post('/insert_employee', function(req, res, next) {
  queries.insert_employee(req,res);
});

app.post('/insert_laundry', function(req, res, next) {
  queries.insert_laundry(req,res);
});

app.put('/update_employee', function(req, res, next) {
  queries.update_employee(req, res);
});

app.put('/update_laundry', function(req, res, next) {
  queries.update_laundry(req, res);
});

app.delete('/delete_employee', function(req, res, next) {
  queries.delete_employee(req, res);
});

app.delete('/delete_laundry', function(req, res, next) {
  queries.delete_laundry(req, res);
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});
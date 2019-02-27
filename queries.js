var { sequelize } = require('./database/sequelize')
var utils = require('./utils.js')

exports.insert_employee = (req, res) => {
  var employee_id = req.body.employee_id;
  var name = req.body.name;
  var salary = req.body.salary;
  var vs = req.body.vs;
  var ve = req.body.ve;

  sequelize.query(`SELECT * FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
  { bind: [employee_id, name, salary]}).spread((results, metadata) => {
    if(results) {
      if(!Array.isArray(results)) {
        results = new Array(results);
      }
      
      // delete
      sequelize.query(`DELETE FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
          { bind: [employee_id, name, salary]}).spread((results, metadata) => {
            console.log("deleted");
      });

      var time_results = utils.merge_union(results, vs, ve);
      time_results.forEach(element => {
        sequelize.query(`INSERT INTO employee(employee_id, name, salary, vs, ve) VALUES($1, $2, $3, $4, $5)`,
          { bind: [employee_id, name, salary,element.vs,element.ve]}).spread((results, metadata) => {
            console.log("inserted");
          });
      });
      res.status(200).send("Insert new time for employee success");
    }else{
      console.log('failed');
      sequelize.query(`INSERT INTO employee(employee_id, name, salary, vs, ve) VALUES($1, $2, $3, $4, $5)`,
      { bind: [employee_id, name, salary,vs,ve]}).spread((results, metadata) => {
        res.status(200).send("Insert new employee success");
      });
    }
  });
}

exports.insert_laundry = (req, res) => {
  var laundry_id = req.body.employee_id;
  var cust_name = req.body.name;
  var emp_id = req.body.salary;
  var service = req.body.service;
  var price = req.body.price;
  var vs = req.body.vs;
  var ve = req.body.ve;

  sequelize.query(`SELECT * FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND emp_id = $3 AND service = $4 AND price = $5`,
  { bind: [laundry_id, cust_name, emp_id, service, price]}).spread((results, metadata) => {
    if(results) {
      if(!Array.isArray(results)) {
        results = new Array(results);
      }
      
      // delete
      sequelize.query(`DELETE FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND emp_id = $3 AND service = $4 AND price = $5`,
      { bind: [laundry_id, cust_name, emp_id, service, price]}).spread((results, metadata) => {
            console.log("deleted");
      });

      var time_results = utils.merge_union(results, vs, ve);
      time_results.forEach(element => {
        sequelize.query(`INSERT INTO laundry(laundry_id, cust_name, emp_id, service, price, vs, ve) VALUES($1, $2, $3, $4, $5, $6, $7)`,
          { bind: [laundry_id, cust_name, emp_id, service, price, element.vs,element.ve]}).spread((results, metadata) => {
            console.log("inserted");
          });
      });
      res.status(200).send("Insert new time for laundry success");
    }else{
      console.log('failed');
      sequelize.query(`INSERT INTO laundry(laundry_id, cust_name, emp_id, service, price, vs, ve) VALUES($1, $2, $3, $4, $5, $6, $7)`,
          { bind: [laundry_id, cust_name, emp_id, service, price, vs,ve]}).spread((results, metadata) => {
            console.log("Insert success");
      });
      res.status(200).send("Insert new laundry success");
    }
  });
}

exports.update_employee = (req, res) => {
  var employee_id = req.body.employee_id;
  var name = req.body.name;
  var salary = req.body.salary;
  var vs = req.body.vs;
  var ve = req.body.ve;

  sequelize.query(`SELECT * FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
  { bind: [employee_id, name, salary]}).spread((results, metadata) => {
    if(results) {
      // delete
      sequelize.query(`DELETE FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
        { bind: [employee_id, name, salary]}).spread((results, metadata) => {
          console.log("deleted");
      });
      sequelize.query(`INSERT INTO employee(employee_id, name, salary, vs, ve) VALUES($1, $2, $3, $4, $5)`,
      { bind: [employee_id, name, salary,vs,ve]}).spread((results, metadata) => {
          console.log("updated");
      });
      res.status(200).send("Updated")
    }else{
      res.status(400).send("Data not found");
    }
  });
}

exports.update_laundry = (req, res) => {
  var laundry_id = req.body.employee_id;
  var cust_name = req.body.name;
  var emp_id = req.body.salary;
  var service = req.body.service;
  var price = req.body.price;
  var vs = req.body.vs;
  var ve = req.body.ve;

  sequelize.query(`SELECT * FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND emp_id = $3 AND service = $4 AND price = $5`,
  { bind: [laundry_id, cust_name, emp_id, service, price]}).spread((results, metadata) => {
    if(results) {
      // delete
      sequelize.query(`DELETE FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND emp_id = $3 AND service = $4 AND price = $5`,
      { bind: [laundry_id, cust_name, emp_id, service, price]}).spread((results, metadata) => {
          console.log("deleted");
      });

      sequelize.query(`INSERT INTO laundry(laundry_id, cust_name, emp_id, service, price, vs, ve) VALUES($1, $2, $3, $4, $5, $6, $7)`,
        { bind: [laundry_id, cust_name, emp_id, service, price, vs, ve]}).spread((results, metadata) => {
          console.log("updated");
      });
      res.status(200).send("Updated")
    }else{
      res.status(400).send("Data not found");
    }
  });
}

exports.delete_employee = (req, res) => {
  var employee_id = req.body.employee_id;
  var name = req.body.name;
  var salary = req.body.salary;
  var vs = req.body.vs;
  var ve = req.body.ve;

  sequelize.query(`SELECT * FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
  { bind: [employee_id, name, salary]}).spread((results, metadata) => {
    if(results) {
      if(!Array.isArray(results)) {
        results = new Array(results);
      }
      // delete
      sequelize.query(`DELETE FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
        { bind: [employee_id, name, salary]}).spread((results, metadata) => {
          console.log("deleted");
      });

      var time_results = utils.merge_substract(results, vs, ve);
      time_results.forEach(element => {
        sequelize.query(`INSERT INTO employee(employee_id, name, salary, vs, ve) VALUES($1, $2, $3, $4, $5)`,
          { bind: [employee_id, name, salary,element.vs,element.ve]}).spread((results, metadata) => {
            console.log("inserted");
          });
      });
      res.status(200).send("Delete success")
    }else{
      res.status(400).send("Data not found");
    }
  });
}

exports.delete_laundry = (req, res) => {
  var laundry_id = req.body.employee_id;
  var cust_name = req.body.name;
  var emp_id = req.body.salary;
  var service = req.body.service;
  var price = req.body.price;
  var vs = req.body.vs;
  var ve = req.body.ve;

  sequelize.query(`SELECT * FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND emp_id = $3 AND service = $4 AND price = $5`,
  { bind: [laundry_id, cust_name, emp_id, service, price]}).spread((results, metadata) => {
    if(results) {
      if(!Array.isArray(results)) {
        results = new Array(results);
      }

      // delete
      sequelize.query(`DELETE FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND emp_id = $3 AND service = $4 AND price = $5`,
      { bind: [laundry_id, cust_name, emp_id, service, price]}).spread((results, metadata) => {
          console.log("deleted");
      });

      var time_results = utils.merge_substract(results, vs, ve);
      time_results.forEach(element => {
        sequelize.query(`INSERT INTO laundry(laundry_id, cust_name, emp_id, service, price, vs, ve) VALUES($1, $2, $3, $4, $5, $6, $7)`,
          { bind: [laundry_id, cust_name, emp_id, service, price, vs,ve]}).spread((results, metadata) => {
            console.log("inserted");
      });
      });
      res.status(200).send("Delete success")
    }else{
      res.status(400).send("Data not found");
    }
  });
}
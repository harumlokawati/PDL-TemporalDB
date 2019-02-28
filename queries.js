var db = require('./database/sequelize')
var utils = require('./utils.js')

exports.temporal_selection = (req,res) => {
  var tab = req.body.tab;
  var col = req.body.col;
  var pred = req.body.pred;
  
  var q = `
    SELECT ${col}, vs, ve FROM ${tab} WHERE ${pred}
  `
  sequelize.query(q).spread((results, metadata) => {
    if (results) {
      res.status(200).send(results);
    } else {
      res.status(400).send("Data not found");
    }
  });

}

exports.insert_employee = (req, res) => {
  var employee_id = req.body.employee_id;
  var name = req.body.name;
  var salary = req.body.salary;
  var vs = req.body.vs;
  var ve = req.body.ve;

  db.employee.findAll({
    raw: true,
    where : {
      employee_id: employee_id
    }
  }).then(employees => {
    console.log(employees)
});

  db.sequelize.query(`SELECT * FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
  { bind: [employee_id, name, salary]}).spread((results, metadata) => {
    if(results) {
      if(!Array.isArray(results)) {
        results = new Array(results);
      }
      
      // delete
      db.sequelize.query(`DELETE FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
          { bind: [employee_id, name, salary]}).spread((results, metadata) => {
            console.log("deleted");
      });

      var time_results = utils.merge_union(results, vs, ve);
      time_results.forEach(element => {
        db.sequelize.query(`INSERT INTO employee(employee_id, name, salary, vs, ve) VALUES($1, $2, $3, $4, $5)`,
          { bind: [employee_id, name, salary,element.vs,element.ve]}).spread((results, metadata) => {
            console.log("inserted");
          });
      });
        res.status(200).send({"data":[], "message":"Insert new time for employee success!", "status":200});
    }else{
      console.log('failed');
      db.sequelize.query(`INSERT INTO employee(employee_id, name, salary, vs, ve) VALUES($1, $2, $3, $4, $5)`,
      { bind: [employee_id, name, salary,vs,ve]}).spread((results, metadata) => {
        res.status(200).send({"data":[], "message":"Insert new employee success!", "status":200});
      });
    }
  });
}

exports.insert_laundry = (req, res) => {
  var laundry_id = req.body.employee_id;
  var cust_name = req.body.name;
  var employee_id = req.body.salary;
  var service = req.body.service;
  var price = req.body.price;
  var vs = req.body.vs;
  var ve = req.body.ve;

  db.sequelize.query(`SELECT * FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND employee_id = $3 AND service = $4 AND price = $5`,
  { bind: [laundry_id, cust_name, employee_id, service, price]}).spread((results, metadata) => {
    if(results) {
      if(!Array.isArray(results)) {
        results = new Array(results);
      }
      
      // delete
      db.sequelize.query(`DELETE FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND employee_id = $3 AND service = $4 AND price = $5`,
      { bind: [laundry_id, cust_name, employee_id, service, price]}).spread((results, metadata) => {
            console.log("deleted");
      });

      var time_results = utils.merge_union(results, vs, ve);
      time_results.forEach(element => {
        db.sequelize.query(`INSERT INTO laundry(laundry_id, cust_name, employee_id, service, price, vs, ve) VALUES($1, $2, $3, $4, $5, $6, $7)`,
          { bind: [laundry_id, cust_name, employee_id, service, price, element.vs,element.ve]}).spread((results, metadata) => {
            console.log("inserted");
          });
      });
      res.status(200).send({"data":[], "message":"Insert new time for laundry success!", "status":200});
    }else{
      console.log('failed');
      db.sequelize.query(`INSERT INTO laundry(laundry_id, cust_name, employee_id, service, price, vs, ve) VALUES($1, $2, $3, $4, $5, $6, $7)`,
          { bind: [laundry_id, cust_name, employee_id, service, price, vs,ve]}).spread((results, metadata) => {
            console.log("Insert success");
      });
      res.status(200).send({"data":[], "message":"Insert new laundry success!", "status":200});
    }
  });
}

exports.update_employee = (req, res) => {
  var employee_id = req.body.employee_id;
  var name = req.body.name;
  var salary = req.body.salary;
  var vs = req.body.vs;
  var ve = req.body.ve;

  db.sequelize.query(`SELECT * FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
  { bind: [employee_id, name, salary]}).spread((results, metadata) => {
    if(results) {
      // delete
      db.sequelize.query(`DELETE FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
        { bind: [employee_id, name, salary]}).spread((results, metadata) => {
          console.log("deleted");
      });
      db.sequelize.query(`INSERT INTO employee(employee_id, name, salary, vs, ve) VALUES($1, $2, $3, $4, $5)`,
      { bind: [employee_id, name, salary,vs,ve]}).spread((results, metadata) => {
          console.log("updated");
      });
      res.status(200).send({"data":[], "message":"Update success!", "status":200});
    }else{
      res.status(400).send({"data":[], "message":"Data not found!", "status":400});
    }
  });
}

exports.update_laundry = (req, res) => {
  var laundry_id = req.body.employee_id;
  var cust_name = req.body.name;
  var employee_id = req.body.salary;
  var service = req.body.service;
  var price = req.body.price;
  var vs = req.body.vs;
  var ve = req.body.ve;

  db.sequelize.query(`SELECT * FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND employee_id = $3 AND service = $4 AND price = $5`,
  { bind: [laundry_id, cust_name, employee_id, service, price]}).spread((results, metadata) => {
    if(results) {
      // delete
      db.sequelize.query(`DELETE FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND employee_id = $3 AND service = $4 AND price = $5`,
      { bind: [laundry_id, cust_name, employee_id, service, price]}).spread((results, metadata) => {
          console.log("deleted");
      });

      db.sequelize.query(`INSERT INTO laundry(laundry_id, cust_name, employee_id, service, price, vs, ve) VALUES($1, $2, $3, $4, $5, $6, $7)`,
        { bind: [laundry_id, cust_name, employee_id, service, price, vs, ve]}).spread((results, metadata) => {
          console.log("updated");
      });
      res.status(200).send({"data":[], "message":"Update success!", "status":200});
    }else{
      res.status(400).send({"data":[], "message":"Data not found!", "status":400});
    }
  });
}

exports.delete_employee = (req, res) => {
  var employee_id = req.body.employee_id;
  var name = req.body.name;
  var salary = req.body.salary;
  var vs = req.body.vs;
  var ve = req.body.ve;

  db.sequelize.query(`SELECT * FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
  { bind: [employee_id, name, salary]}).spread((results, metadata) => {
    if(results) {
      if(!Array.isArray(results)) {
        results = new Array(results);
      }
      // delete
      db.sequelize.query(`DELETE FROM employee WHERE employee_id = $1 AND name = $2 AND salary = $3`,
        { bind: [employee_id, name, salary]}).spread((results, metadata) => {
          console.log("deleted");
      });

      var time_results = utils.merge_substract(results, vs, ve);
      time_results.forEach(element => {
        db.sequelize.query(`INSERT INTO employee(employee_id, name, salary, vs, ve) VALUES($1, $2, $3, $4, $5)`,
          { bind: [employee_id, name, salary,element.vs,element.ve]}).spread((results, metadata) => {
            console.log("inserted");
          });
      });
      res.status(200).send({"data":[], "message":"Delete success!", "status":200});
    }else{
      res.status(400).send({"data":[], "message":"Data not found!", "status":400});
    }
  });
}

exports.delete_laundry = (req, res) => {
  var laundry_id = req.body.employee_id;
  var cust_name = req.body.name;
  var employee_id = req.body.salary;
  var service = req.body.service;
  var price = req.body.price;
  var vs = req.body.vs;
  var ve = req.body.ve;

  db.sequelize.query(`SELECT * FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND employee_id = $3 AND service = $4 AND price = $5`,
  { bind: [laundry_id, cust_name, employee_id, service, price]}).spread((results, metadata) => {
    if(results) {
      if(!Array.isArray(results)) {
        results = new Array(results);
      }

      // delete
      db.sequelize.query(`DELETE FROM laundry WHERE laundry_id = $1 AND cust_name = $2 AND employee_id = $3 AND service = $4 AND price = $5`,
      { bind: [laundry_id, cust_name, employee_id, service, price]}).spread((results, metadata) => {
          console.log("deleted");
      });

      var time_results = utils.merge_substract(results, vs, ve);
      time_results.forEach(element => {
        db.sequelize.query(`INSERT INTO laundry(laundry_id, cust_name, employee_id, service, price, vs, ve) VALUES($1, $2, $3, $4, $5, $6, $7)`,
          { bind: [laundry_id, cust_name, employee_id, service, price, vs,ve]}).spread((results, metadata) => {
            console.log("inserted");
      });
      });
      res.status(200).send({"data":[], "message":"Delete success!", "status":200});
    }else{
      res.status(400).send({"data":[], "message":"Data not found!", "status":400});
    }
  });
}

exports.temporal_join = (req, res) => {
	console.log(req.query);
	var tab1 = req.body.tab1;
	var tab2 = req.body.tab2;
	var col = req.body.col;

	var q = `
		SELECT column_name FROM information_schema.columns WHERE (table_name = '${tab1}' OR table_name = '${tab2}') AND (column_name != 'vs' AND column_name != 've' AND column_name != '${col}')
	`
	if (tab1 < tab2){
		q = q + "ORDER BY table_name ASC";
	} else {
		q = q + "ORDER BY table_name DESC";
	}
	sequelize.query(q).spread((results, metadata) => {
		var columns = "";
		for (var i = 0; i < results.length; i++) { 
			if (i != 0) {
				columns = columns + ", ";
			}
			columns = columns + results[i].column_name;
		}
		console.log(columns);
		sequelize.query(`(
			SELECT ${tab1}.${col}, ${columns}, ${tab1}.vs, ${tab2}.ve FROM ${tab1} JOIN ${tab2} ON (${tab1}.${col}=${tab2}.${col}) WHERE ${tab1}.vs > ${tab2}.vs AND ${tab1}.ve>${tab2}.ve AND ${tab1}.vs < ${tab2}.ve AND ${tab1}.ve>${tab2}.vs
			UNION
			SELECT ${tab1}.${col}, ${columns}, ${tab1}.vs, ${tab1}.ve FROM ${tab1} JOIN ${tab2} ON (${tab1}.${col}=${tab2}.${col}) WHERE ${tab1}.vs >= ${tab2}.vs AND ${tab1}.ve<=${tab2}.ve AND ${tab1}.vs < ${tab2}.ve AND ${tab1}.ve>${tab2}.vs
			UNION
			SELECT ${tab1}.${col}, ${columns}, ${tab2}.vs, ${tab1}.ve FROM ${tab1} JOIN ${tab2} ON (${tab1}.${col}=${tab2}.${col}) WHERE ${tab1}.vs < ${tab2}.vs AND ${tab1}.ve<${tab2}.ve AND ${tab1}.vs < ${tab2}.ve AND ${tab1}.ve>${tab2}.vs
			UNION
			SELECT ${tab1}.${col}, ${columns}, ${tab2}.vs, ${tab2}.ve FROM ${tab1} JOIN ${tab2} ON (${tab1}.${col}=${tab2}.${col}) WHERE ${tab1}.vs <= ${tab2}.vs AND ${tab1}.ve>=${tab2}.ve AND ${tab1}.vs < ${tab2}.ve AND ${tab1}.ve>${tab2}.vs
			) ORDER BY laundry_id
		`).spread((results, metadata) => {
			if (results){	
				res.status(200).send({"data":results, "message":"Join success! Return {$results.length} data!", "status":200});
			} else {
				res.status(400).send("FAIL");
			}
		});
	});
}

exports.select  = (req, res) => {
	console.log(req.body);
	var tab = req.body.tab;
	var rel = req.body.rel;
	var ts = req.body.ts;
	var te = req.body.te;
	var q = `SELECT * FROM ${tab} WHERE `;
	if (rel == 1) {			//Before
		q = q + `${tab}.ve < '${ts}'`;
	} else if (rel == 2) {	//After
		q = q + `${tab}.vs > '${te}'`;
	} else if (rel == 3) {	//Equal
		q = q + `${tab}.vs = '${ts}' AND ${tab}.ve = '${te}'`;
	} else if (rel == 4) {	//Meets
		q = q + `${tab}.ve = '${ts}'`;
	} else if (rel == 5) {	//Met by
		q = q + `${tab}.vs = '${te}'`;
	} else if (rel == 6) {	//Overlaps
		q = q + `${tab}.vs < '${ts}' AND ${tab}.ve < '${te}' AND ${tab}.ve > '${ts}'`;
	} else if (rel == 7) {	//Overlapped by
		q = q + `${tab}.vs > '${ts}' AND ${tab}.vs < '${te}' AND ${tab}.ve > '${te}'`;
	} else if (rel == 8) {	//During
		q = q + `${tab}.vs > '${ts}' AND ${tab}.ve < '${te}'`;
	} else if (rel == 9) {	//Contains
		q = q + `${tab}.vs < '${ts}' AND ${tab}.ve > '${te}'`;
	} else if (rel == 10) {	//Starts
		q = q + `${tab}.vs = '${ts}' AND ${tab}.ve < '${te}'`;
	} else if (rel == 11) {	//Started by
		q = q + `${tab}.vs = '${ts}' AND ${tab}.ve > '${te}'`;
	} else if (rel == 12) {	//Finishes
		q = q + `${tab}.vs > '${ts}' AND ${tab}.ve = '${te}'`;
	} else if (rel == 13) {	//Finished by
		q = q + `${tab}.vs < '${ts}' AND ${tab}.ve = '${te}'`;
	}
	sequelize.query(q).spread((results, metadata) => {
		if (results){	
			res.status(200).send({"data":results, "message":"Selection success! Return {$results.length} data!", "status":200});
		} else {
			res.status(400).send("FAIL");
		}
	});
}

exports.temporal_difference  = (req, res) => {
	//NOTE: Hanya untuk laundry - employee dan kebalikannya
	console.log(req.body);
	var tab1 = req.body.tab1;
	var tab2 = req.body.tab2;

	sequelize.query(`(
		SELECT ${tab1}.employee_id, ${tab1}.vs, ${tab1}.ve FROM ${tab1} JOIN ${tab2} ON (${tab1}.employee_id=${tab2}.employee_id) WHERE ${tab1}.vs < ${tab2}.vs AND ${tab1}.ve<${tab2}.ve AND ${tab1}.vs < ${tab2}.ve AND ${tab1}.ve<=${tab2}.vs
		UNION
		SELECT ${tab1}.employee_id, ${tab1}.vs, ${tab1}.ve FROM ${tab1} JOIN ${tab2} ON (${tab1}.employee_id=${tab2}.employee_id) WHERE ${tab1}.vs > ${tab2}.vs AND ${tab1}.ve>${tab2}.ve AND ${tab1}.vs >= ${tab2}.ve AND ${tab1}.ve>${tab2}.vs
		UNION
		SELECT ${tab1}.employee_id, ${tab1}.vs, ${tab2}.vs AS ve FROM ${tab1} JOIN ${tab2} ON (${tab1}.employee_id=${tab2}.employee_id) WHERE ${tab1}.vs < ${tab2}.vs AND ${tab1}.vs < ${tab2}.ve AND ${tab1}.ve>${tab2}.vs
		UNION
		SELECT ${tab1}.employee_id, ${tab2}.ve as vs, ${tab1}.ve FROM ${tab1} JOIN ${tab2} ON (${tab1}.employee_id=${tab2}.employee_id) WHERE ${tab1}.ve>${tab2}.ve AND ${tab1}.vs < ${tab2}.ve AND ${tab1}.ve>${tab2}.vs
		) ORDER BY employee_id
	`).spread((results, metadata) => {
		if (results){	
			res.status(200).send({"data":results, "message":"Difference success! Return {$results.length} data!", "status":200});
		} else {
			res.status(400).send("FAIL");
		}

	});
}

exports.timeslice  = (req, res) => {
	var tab = req.body.tab;
	var t = req.body.t;
	sequelize.query(`SELECT * FROM ${tab} WHERE ${tab}.vs <= '${t}' AND ${tab}.ve > '${t}'`).spread((results, metadata) => {
		if (results){	
			res.status(200).send({"data":results, "message":"Timeslice success! Return {$results.length} data!", "status":200});
		} else {
			res.status(400).send("FAIL");
		}
	});
}

exports.temporal_union = (req,res) => {
  //NOTE : Hanya untuk laundry - laundry_member
  console.log(req.body)
  var tab1 = req.body.tab1;
  var tab2 = req.body.tab2;
  var list_cleaned = [];

  var q = `
    SELECT * FROM ${tab1} UNION ALL SELECT * FROM ${tab2}
  `
  sequelize.query(q).spread((results, metadata) => {
    if (results) {
      for (var i = 0; i < results.length; i++) { 
        data = results[i];
        // var j = 0;
        results.forEach(function(a) {
          var match = a.laundry_id.match(data.laundry_id)
          if (match) {
            if (data.vs <= a.vs && data.ve >= a.ve) {
              a.ve = data.ve;
              a.vs = data.vs;
            } else if (data.vs <= a.vs && data.vs <= a.ve && data.ve >= a.vs) {
              data.ve = a.ve;
              a.vs = data.vs;
            } else if (data.vs >= a.vs && data.vs <= a.ve && data.ve >= a.ve) {
              data.vs = a.vs;
              a.ve = data.ve;
            }
            list_cleaned = utils.arrUnique(results);
          }
        });
      }
    }   
    if (list_cleaned.length > 0) {
      res.status(200).send(list_cleaned);
    } else {
      res.status(400).send("Data not found");
    }
  });
}

exports.temporal_projection =(req, res) => {
  console.log(req.body);
  var tab = req.body.tab;
  var col = req.body.col;
  var columns = col.split(",");
  var list_cleaned = [];

  var q = `
    SELECT ${col}, vs, ve FROM ${tab}
  `

  sequelize.query(q).spread((results, metadata) => {
    if (results) {
     
      for (var i = 0; i < results.length; i++) { 
        data = results[i];
        results.forEach(function(a) {
          var countmatch = 0;
          for (var count = 0; count < columns.length; count++) {
            if (data[columns[count]] == a[columns[count]]) {
              countmatch++;
            }
          }
          if (countmatch == columns.length) {
            if (data.vs <= a.vs && data.ve >= a.ve) {
              a.ve = data.ve;
              a.vs = data.vs;
            } else if (data.vs <= a.vs && data.vs <= a.ve && data.ve >= a.vs) {
              data.ve = a.ve;
              a.vs = data.vs;
            } else if (data.vs >= a.vs && data.vs <= a.ve && data.ve >= a.ve) {
              data.vs = a.vs;
              a.ve = data.ve;
            }

            list_cleaned = utils.arrUnique(results);
          }
        });
      }
    }
    if (list_cleaned.length > 0) {
      res.status(200).send(list_cleaned);
    } else {
      res.status(400).send("Data not found");
    }
  });
} 
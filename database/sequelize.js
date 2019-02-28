const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/laundry');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been made');
  })
  .catch(err => {
    console.error('Failed to connect:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.employee = require('./models/employee.js')(sequelize, Sequelize);
db.laundry = require('./models/laundry.js')(sequelize, Sequelize);

module.exports = db;
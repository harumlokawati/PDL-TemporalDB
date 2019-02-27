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

module.exports = {
  sequelize
}
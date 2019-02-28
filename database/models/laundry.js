'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Laundry = sequelize.define('laundry', {
    laundry_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    cust_name: {
      type: DataTypes.STRING
    },
    employee_id: {
      type: DataTypes.STRING
    },
    service: {
      type: DataTypes.STRING
    },
    price : {
      type: DataTypes.INTEGER
    },
    vs: {
      type: DataTypes.DATE
    },
    ve : {
      type: DataTypes.DATE
    }
  },
  {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  return Laundry;
};
'use strict'

module.exports = (sequelize, DataTypes) => {  
  const Employee = sequelize.define('employee', {
    employee_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    salary: {
      type: DataTypes.INTEGER
    },
    vs: {
      type: DataTypes.DATE
    },
    ve : {
      type: DataTypes.DATE
    }
  }
  ,
  {
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    timestamps: false
  });
  return Employee;
};
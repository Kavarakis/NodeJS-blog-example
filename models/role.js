'use strict';
module.exports = (sequelize, DataTypes) => {
  let Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function() {
        // associations can be defined here
      }
    }
  });
  return Role;
};
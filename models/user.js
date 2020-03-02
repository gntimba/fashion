'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    lastName: DataTypes.CHAR(50),
    firstName: DataTypes.CHAR(50),
    picture:DataTypes.CHAR(50),
    dob:DataTypes.DATE,
    mail: DataTypes.STRING,
    phoneNumber:DataTypes.CHAR(50),
    address:{ type: DataTypes.STRING, defaultValue: null},
    city:{ type: DataTypes.STRING, defaultValue: null},
    postal:{ type: DataTypes.STRING, defaultValue: null},
    suburb:{ type: DataTypes.STRING, defaultValue: null},
    active: { type: DataTypes.BOOLEAN, defaultValue: 1},
    active_hash: DataTypes.STRING,
    role_id: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};